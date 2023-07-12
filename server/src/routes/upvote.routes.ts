import express from 'express';
import {
  addUpvoteHandler,
  getUpvotesByFeedbackIdHandler,
} from '../controllers/upvote.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

router.get('/:id', getUpvotesByFeedbackIdHandler);
router.post('/addUpvote', deserializeUser, requireUser, addUpvoteHandler);

export default router;
