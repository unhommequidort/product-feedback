import { Request, Response, NextFunction } from 'express';
import {
  getAllActiveStatuses,
  getAllStatuses,
} from '../services/status.service';

export const getAllStatusesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const statuses = await getAllStatuses();

    res.status(200).json({
      status: 'success',
      data: statuses,
    });
  } catch (error) {
    next(error);
  }
};

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
