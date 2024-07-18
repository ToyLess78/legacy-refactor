import express from 'express';
import { healthController } from '../controllers/health.сontroller';
import { getUserById } from '../controllers/controllers';
import { validateUserId } from '../middlewares/middelewares';
import { updateUser } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/health', healthController);
router.get('/users/:id', validateUserId, getUserById);
router.put('/users/:id', authenticateToken, validateUserId, updateUser);

export default router;