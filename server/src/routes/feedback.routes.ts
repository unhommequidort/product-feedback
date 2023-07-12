import express from 'express';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import {
  createFeedbackHandler,
  deleteFeedbackHandler,
  getAllFeedbackHandler,
  getFeedbackByIdHandler,
  getFeedbackByStatusHandler,
  updateFeedbackHandler,
} from '../controllers/feedback.controller';

const router = express.Router();

// router.use(deserializeUser, requireUser);

router.get('/status', getFeedbackByStatusHandler);
router.post('/create', deserializeUser, requireUser, createFeedbackHandler);
router.patch(
  '/update/:id',
  deserializeUser,
  requireUser,
  updateFeedbackHandler
);
router.delete(
  '/delete/:id',
  deserializeUser,
  requireUser,
  deleteFeedbackHandler
);
router.get('/:id', getFeedbackByIdHandler);
router.get('/', getAllFeedbackHandler);

export default router;
