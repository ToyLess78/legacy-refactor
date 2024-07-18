import express from 'express';
import { healthController } from '../controllers/health.сontroller';

const router = express.Router();

router.get('/health', healthController);

export default router;