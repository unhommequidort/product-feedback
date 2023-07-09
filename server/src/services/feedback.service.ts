import { Feedback, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createFeedback = async (input: Prisma.FeedbackCreateInput) => {
  return (await prisma.feedback.create({
    data: input,
  })) as Feedback;
};

export const getAllFeedback = async () => {
  return (await prisma.feedback.findMany()) as Feedback[];
};

export const getFeedbackById = async (id: string) => {
  return (await prisma.feedback.findUnique({
    where: {
      id: id,
    },
  })) as Feedback;
};

export const updateFeedback = async (
  id: string,
  input: Prisma.FeedbackUpdateInput
) => {
  return (await prisma.feedback.update({
    where: {
      id: id,
    },
    data: input,
  })) as Feedback;
};

export const deleteFeedback = async (id: string) => {
  return (await prisma.feedback.delete({
    where: {
      id: id,
    },
  })) as Feedback;
};

export const getFeedbackByStatus = async (status: string) => {
  return (await prisma.feedback.findMany({
    where: {
      status: status,
    },
  })) as Feedback[];
};

export const getFeedbackByCategory = async (category: string) => {
  return (await prisma.feedback.findMany({
    where: {
      category: category,
    },
  })) as Feedback[];
};

export const getFeedbackByUserId = async (id: string) => {
  return (await prisma.feedback.findMany({
    where: {
      id,
    },
  })) as Feedback[];
};
