import { Request, Response, NextFunction } from 'express';
import { getRecursivelyNestedCommentsByFeedbackId } from '../services/comment.service';

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
