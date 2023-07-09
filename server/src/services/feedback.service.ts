import { Feedback, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createFeedback = async (input: Prisma.FeedbackCreateInput) => {
  return (await prisma.feedback.create({
    data: input,
  })) as Feedback;
};
