import { Request, Response, NextFunction } from 'express';
import { getAllCategories } from '../services/category.service';

export const getAllCategoriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      status: 'success',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
