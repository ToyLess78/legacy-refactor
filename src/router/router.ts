import express from 'express';
import { healthController } from '../controllers/health.сontroller';
import { getUserById } from '../controllers/controllers';
import { validateUserId } from '../middlewares/middelewares';

const router = express.Router();

router.get('/health', healthController);
router.get('/users/:id', validateUserId, getUserById);

export default router;