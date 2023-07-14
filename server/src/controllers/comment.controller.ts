import { Request, Response, NextFunction } from 'express';
import {
  createComment,
  getRecursivelyNestedCommentsByFeedbackId,
} from '../services/comment.service';
import { createCommentInput } from '../schemas/comment.schema';

export const createCommentHandler = async (
  req: Request<{}, {}, createCommentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, feedbackId, parentId } = req.body;
    const comment = await createComment({
      body,
      feedback: {
        connect: {
          id: feedbackId,
        },
      },
      user: {
        connect: {
          id: res.locals.user.id,
        },
      },
      comment: {
        connect: {
          id: parentId,
        },
      },
    });

    res.status(201).json({
      status: 'success',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecursivelyNestedCommentsByFeedbackIdHandler = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const comments = await getRecursivelyNestedCommentsByFeedbackId(id);

    res.status(200).json({
      status: 'success',
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};
