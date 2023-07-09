import express from 'express';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { createFeedbackHandler } from '../controllers/feedback.controller';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/create', createFeedbackHandler);

export default router;
