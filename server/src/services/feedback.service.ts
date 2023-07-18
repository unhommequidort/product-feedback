import { Feedback, Prisma } from '@prisma/client';

import prisma from '../libs/prisma';

export const createFeedback = async (input: Prisma.FeedbackCreateInput) => {
  return (await prisma.feedback.create({
    data: input,
  })) as Feedback;
};

const findFeedback = async (key: string, order: string) => {
  return (await prisma.feedback.findMany({
    orderBy: {
      [key]: {
        _count: order,
      },
    },
    include: {
      _count: {
        select: { upvote: true, comment: true },
      },
    },
  })) as Feedback[];
};

// GetAllFeedback takes in an orderBy string and returns an array of feedback
export const getAllFeedback = async (orderBy: string) => {
  switch (orderBy) {
    case 'upvoteAsc':
      return findFeedback('upvote', 'asc');
    case 'upvoteDesc':
      return findFeedback('upvote', 'desc');
    case 'commentAsc':
      return findFeedback('comment', 'asc');
    case 'commentDesc':
      return findFeedback('comment', 'desc');
    default:
      return (await prisma.feedback.findMany({
        include: {
          _count: {
            select: { upvote: true, comment: true },
          },
        },
      })) as Feedback[];
  }
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
