import { Upvote, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  if (upvote) {
    throw new Error('User already upvoted this feedback');
  }

  (await prisma.upvote.create({
    data: {
      userId,
      feedbackId,
    },
  })) as Upvote;

  return getUpvoteCountByFeedbackId(feedbackId);
};
