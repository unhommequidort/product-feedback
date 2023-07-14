import { Comment, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createComment = async (input: Prisma.CommentCreateInput) => {
  return await prisma.comment.create({
    data: input,
  });
};

export const getCommentsByFeedbackId = async (feedbackId: string) => {
  return (await prisma.comment.findMany({
    where: {
      feedbackId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  })) as Comment[];
};

const getRecursivelyNestedComments = (comments: Comment[]) => {
  return comments.map((comment): any => {
    const nestedComments = comments.filter(
      (nestedComment) => nestedComment.parentId === comment.id
    );
    return {
      ...comment,
      nestedComments: getRecursivelyNestedComments(nestedComments),
    };
  });
};

export const getRecursivelyNestedCommentsByFeedbackId = async (
  feedbackId: string
) => {
  const comments = await getCommentsByFeedbackId(feedbackId);
  const nestedComments = comments.filter(
    (comment) => comment.parentId !== null
  );
  const nestedCommentsWithParent = nestedComments.map((nestedComment) => {
    const parent = comments.find(
      (comment) => comment.id === nestedComment.parentId
    );
    return {
      ...nestedComment,
      parent,
    };
  });
  const rootComments = comments.filter((comment) => comment.parentId === null);
  return rootComments.map((rootComment) => {
    const nestedComments = nestedCommentsWithParent.filter(
      (nestedComment) => nestedComment.parentId === rootComment.id
    );
    return {
      ...rootComment,
      nestedComments: getRecursivelyNestedComments(nestedComments),
    };
  }) as Comment[];
};
