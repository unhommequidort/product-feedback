import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import AppError from '../utils/appError';
import { verifyJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { excludedFields, findUniqueUser } from '../services/user.service';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new AppError(401, 'You are not logged in'));
    }

    // Validate the access token

    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      'accessTokenPublicKey'
    );

    if (!decoded) {
      return next(new AppError(401, 'Invalid token or session has expired'));
    }

    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(401, 'Invalid token or session has expired'));
    }

    // Check if user exists
    const user = await findUniqueUser({ id: JSON.parse(session).id });

    if (!user) {
      return next(new AppError(401, 'That user cannot be found'));
    }

    res.locals.user = omit(user, excludedFields);
  } catch (error) {}
};
