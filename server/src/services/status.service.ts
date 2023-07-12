import { Status, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllActiveStatuses = async () => {
  return (await prisma.status.findMany({
    where: {
      name: {
        not: 'Suggestion',
      },
    },
  })) as Status[];
};

export const getAllStatuses = async () => {
  return (await prisma.status.findMany()) as Status[];
};
