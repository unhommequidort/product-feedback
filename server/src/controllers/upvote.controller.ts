import { Request, Response, NextFunction } from 'express';

import {
  addUpvote,
  getUpvoteCountByFeedbackId,
} from '../services/upvote.service';

export const getUpvotesByFeedbackIdHandler = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const feedbackId = req.params.id;
  try {
    const upvotes = await getUpvoteCountByFeedbackId(feedbackId);

    res.status(200).json({
      status: 'success',
      data: upvotes,
    });
  } catch (error) {
    next(error);
  }
};

export const addUpvoteHandler = async (
  req: Request<{ feedbackId: string }>,
  res: Response,
  next: NextFunction
) => {
  const feedbackId = req.body.feedbackId;
  const userId = res.locals.user.id;
  try {
    const upvote = await addUpvote(feedbackId, userId);

    res.status(200).json({
      status: 'success',
      data: upvote,
    });
  } catch (error) {
    next(error);
  }
};
