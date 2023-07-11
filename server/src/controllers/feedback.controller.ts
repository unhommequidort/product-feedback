import { Request, Response, NextFunction } from 'express';
import {
  createFeedbackInput,
  updateFeedbackInput,
} from '../schemas/feedback.schema';
import {
  createFeedback,
  getAllFeedback,
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const feedbacks = await getAllFeedback();

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
