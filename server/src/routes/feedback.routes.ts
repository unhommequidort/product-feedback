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

router.use(deserializeUser, requireUser);

router.get('/status', getFeedbackByStatusHandler);
router.post('/create', createFeedbackHandler);
router.patch('/update/:id', updateFeedbackHandler);
router.delete('/delete/:id', deleteFeedbackHandler);
router.get('/:id', getFeedbackByIdHandler);
router.get('/', getAllFeedbackHandler);

export default router;
