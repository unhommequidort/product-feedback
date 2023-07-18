import { Category } from '@prisma/client';

import prisma from '../libs/prisma';

export const getAllCategories = async () => {
  return (await prisma.category.findMany({
    orderBy: {
      sort: 'asc',
    },
  })) as Category[];
};
