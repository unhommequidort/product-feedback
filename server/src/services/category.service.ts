import { Category, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCategories = async () => {
  return (await prisma.category.findMany()) as Category[];
};
