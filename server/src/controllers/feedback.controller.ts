import { Request, Response, NextFunction } from 'express';
import {
  createFeedbackInput,
  updateFeedbackInput,
} from '../schemas/feedback.schema';
import {
  createFeedback,
  deleteFeedback,
  getAllFeedback,
  getFeedbackByCategory,
  getFeedbackById,
  getFeedbackByStatus,
  updateFeedback,
} from '../services/feedback.service';

export const createFeedbackHandler = async (
  req: Request<{}, {}, createFeedbackInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, detail, category } = req.body;

    const feedback = await createFeedback({
      title,
      detail,
      category_feedback_categoryTocategory: {
        connect: {
          name: category,
        },
      },
      user: {
        connect: {
          id: res.locals.user.id,
        },
      },
    });

    res.status(201).json({
      status: 'success',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllFeedbackHandler = async (
  req: Request<{}, {}, {}, { orderBy: string }>,
  res: Response,
  next: NextFunction
) => {
  const orderBy = req.query.orderBy;
  try {
    const feedbacks = await getAllFeedback(orderBy);

    res.status(200).json({
      status: 'success',
      data: feedbacks,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeedbackByIdHandler = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await getFeedbackById(feedbackId);

    res.status(200).json({
      status: 'success',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeedbackByStatusHandler = async (
  req: Request<{}, {}, {}, { s: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = req.query.s;
    const feedbacks = await getFeedbackByStatus(status);

    res.status(200).json({
      status: 'success',
      data: feedbacks,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeedbackByCategoryHandler = async (
  req: Request<{}, {}, {}, { c: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.query.c;
    const feedbacks = await getFeedbackByCategory(category);

    res.status(200).json({
      status: 'success',
      data: feedbacks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFeedbackHandler = async (
  req: Request<{ id: string }, {}, updateFeedbackInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const feedbackId = req.params.id;
    const { title, detail, category, status } = req.body;

    const feedback = await updateFeedback(feedbackId, {
      title,
      detail,
      category_feedback_categoryTocategory: {
        connect: {
          name: category,
        },
      },
      status_feedback_statusTostatus: {
        connectOrCreate: {
          where: {
            name: status,
          },
          create: {
            name: status!,
          },
        },
      },
    });

    res.status(200).json({
      status: 'success',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFeedbackHandler = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const feedback = await deleteFeedback(id);
    res.status(200).json({
      status: 'success',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};
