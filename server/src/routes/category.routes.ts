import express from 'express';
import { getAllCategoriesHandler } from '../controllers/category.controller';

const router = express.Router();

router.get('/', getAllCategoriesHandler);

export default router;
