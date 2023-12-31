import { Status } from '@prisma/client';
import prisma from '../libs/prisma';

export const getAllActiveStatuses = async () => {
  return (await prisma.status.findMany({
    where: {
      name: {
        not: 'Suggestion',
      },
    },
    orderBy: {
      sort: 'asc',
    },
  })) as Status[];
};

export const getAllStatuses = async () => {
  return (await prisma.status.findMany()) as Status[];
};
