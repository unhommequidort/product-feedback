import crypto from 'crypto';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import {
  LoginUserInput,
  RegisterUserInput,
  VerifyEmailInput,
} from '../schemas/user.schema';
import {
  createUser,
  findUniqueUser,
  signTokens,
  updateUser,
} from '../services/user.service';
import { Prisma } from '@prisma/client';
import config from 'config';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';
import { signJwt, verifyJwt } from '../utils/jwt';
import Email from '../utils/email';

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production') {
  cookiesOptions.secure = true;
}

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
  ),
};

export const registerUserHandler = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const verifyCode = crypto.randomBytes(32).toString('hex');
    const verificationCode = crypto
      .createHash('sha256')
      .update(verifyCode)
      .digest('hex');

    const user = await createUser({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      verificationCode,
    });

    const redirectUrl = `${config.get<string>(
      'origin'
    )}/verifyemail/${verifyCode}`;
    try {
      await new Email(user, redirectUrl).sendVerificationCode();
      await updateUser({ id: user.id }, { verificationCode });

      res.status(201).json({
        status: 'success',
        message:
          'An email with a verification code has been sent to your email',
      });
    } catch (error) {
      await updateUser({ id: user.id }, { verificationCode: null });
      return res.status(500).json({
        status: 'error',
        message: 'There was an error sending email, please try again',
      });
    }
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already exist, please use another email address',
        });
      }
    }
    next(err);
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await findUniqueUser(
      { email: email.toLowerCase() },
      { id: true, email: true, verified: true, password: true }
    );

    if (!user) {
      return next(new AppError(400, 'Invalid email or password'));
    }

    // Check if user is verified
    if (!user.verified) {
      return next(
        new AppError(
          401,
          'You are not verified, please verify your email to login'
        )
      );
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError(400, 'Invalid email or password'));
    }

    // Sign Tokens
    const { access_token, refresh_token } = await signTokens(user);
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    next(err);
  }
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    const message = 'Could not refresh access token';

    if (!refresh_token) {
      return next(new AppError(403, message));
    }

    // Validate refresh token
    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      'refreshTokenPublicKey'
    );

    if (!decoded) {
      return next(new AppError(403, message));
    }

    // Check if user has a valid session
    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(403, message));
    }

    // Check if user exists
    const user = await findUniqueUser({
      id: JSON.parse(session).id,
    });

    if (!user) {
      return next(new AppError(403, message));
    }

    // Sign new access token
    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });

    // Add cookies
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send the response
    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (error: unknown) {
    next(error);
  }
};

function logout(res: Response) {
  res.cookie('access_token', '', { maxAge: -1 });
  res.cookie('refresh_token', '', { maxAge: -1 });
  res.cookie('logged_in', '', { maxAge: -1 });
}

export const logoutUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await redisClient.del(res.locals.user.id);
    logout(res);

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailHandler = async (
  req: Request<VerifyEmailInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const verificationCode = crypto
      .createHash('sha256')
      .update(req.params.verificationCode)
      .digest('hex');

    //  If the user doesn’t exist in the database then it means the verification code provided is invalid.
    const user = await updateUser(
      { verificationCode },
      { verified: true, verificationCode: null },
      { email: true }
    );

    if (!user) {
      return next(new AppError(401, 'Could not verify email'));
    }

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(403).json({
        status: 'fail',
        message: 'Verification code is invalid or user does not exist',
      });
    }
  }
};
