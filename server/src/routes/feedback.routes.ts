import express from 'express';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import {
  createFeedbackHandler,
  getAllFeedbackHandler,
  updateFeedbackHandler,
} from '../controllers/feedback.controller';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/create', createFeedbackHandler);
router.get('/all', getAllFeedbackHandler);
router.patch('/update/:id', updateFeedbackHandler);

export default router;
