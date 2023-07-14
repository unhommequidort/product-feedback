import express from 'express';
import {
  createCommentHandler,
  getRecursivelyNestedCommentsByFeedbackIdHandler,
} from '../controllers/comment.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

router.post('/', deserializeUser, requireUser, createCommentHandler);
router.get('/:id', getRecursivelyNestedCommentsByFeedbackIdHandler);

export default router;
