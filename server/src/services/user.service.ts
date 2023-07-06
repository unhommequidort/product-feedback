import { PrismaClient, Prisma, User } from '@prisma/client';
import config from 'config';
import redisClient from '../utils/connectRedis';
import { signJwt } from '../utils/jwt';

export const excludedFields = ['password', 'verified', 'verificationCode'];

const prisma = new PrismaClient();

export const createUser = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: input,
  })) as User;
};

export const findUniqueUser = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findUnique({
    where,
    select,
  })) as User;
};
