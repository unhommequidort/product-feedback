import { Request, Response, NextFunction } from 'express';
import { createFeedbackInput } from '../schemas/feedback.schema';
import { createFeedback } from '../services/feedback.service';

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
