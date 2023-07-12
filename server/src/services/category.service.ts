import { Category, PrismaClient } from '@prisma/client';
import { orderBy } from 'lodash';

const prisma = new PrismaClient();

export const getAllCategories = async () => {
  return (await prisma.category.findMany({
    orderBy: {
      sort: 'asc',
    },
  })) as Category[];
};
