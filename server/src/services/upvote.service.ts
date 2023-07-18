import { Upvote } from '@prisma/client';
import prisma from '../libs/prisma';

export const getUpvoteCountByFeedbackId = async (feedbackId: string) => {
  return (await prisma.upvote.count({
    where: {
      feedbackId,
    },
  })) as number;
};

export const addUpvote = async (feedbackId: string, userId: string) => {
  // check if user already upvoted
  const upvote = await prisma.upvote.findFirst({
    where: {
      feedbackId,
      userId,
    },
  });

  // if user already upvoted, throw error
  if (upvote) {
    throw new Error('User already upvoted this feedback');
  }

  // if user has not upvoted, create upvote
  await prisma.upvote.create({
    data: {
      userId,
      feedbackId,
    },
  });

  // return upvote count
  return getUpvoteCountByFeedbackId(feedbackId);
};
