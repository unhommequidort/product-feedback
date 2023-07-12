import { Request, Response, NextFunction } from 'express';
import { getAllActiveStatuses } from '../services/status.service';

export const getAllActiveStatusesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const statuses = await getAllActiveStatuses();

    res.status(200).json({
      status: 'success',
      data: statuses,
    });
  } catch (error) {
    next(error);
  }
};
