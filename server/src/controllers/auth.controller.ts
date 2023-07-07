import crypto from 'crypto';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { LoginUserInput, RegisterUserInput } from '../schemas/user.schema';
import {
  createUser,
  findUniqueUser,
  signTokens,
} from '../services/user.service';
import { Prisma } from '@prisma/client';
import config from 'config';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';
import { signJwt, verifyJwt } from '../utils/jwt';

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production') {
  cookiesOptions.secure = true;
}

const accesTokenCookieOptions: CookieOptions = {
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
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      verificationCode,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already exists, please use another email address',
        });
      }
    }
    next(error);
  }
};
