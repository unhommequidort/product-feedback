import express from 'express';
import {
  getAllActiveStatusesHandler,
  getAllStatusesHandler,
} from '../controllers/status.controller';

const router = express.Router();

router.get('/active', getAllActiveStatusesHandler);
router.get('/', getAllStatusesHandler);

export default router;
