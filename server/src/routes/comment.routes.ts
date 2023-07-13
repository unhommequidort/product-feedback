import express from 'express';
import { getRecursivelyNestedCommentsByFeedbackIdHandler } from '../controllers/comment.controller';

const router = express.Router();

router.get('/:id', getRecursivelyNestedCommentsByFeedbackIdHandler);

export default router;
