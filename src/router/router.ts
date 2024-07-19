import express from 'express';

import { validateUserId } from '../middlewares/middelewares';
import { updateUser } from '../controllers/user/update-user.controller';
import { validateToken } from '../middlewares/validate/validate-token.middleware';
import { createUserHandler, getUserById, healthController } from '../controllers/controllers';

const router = express.Router();

router.get('/health', healthController);

router.get('/users/:id', validateUserId, getUserById);
router.put('/users/:id', validateToken, validateUserId, updateUser);
router.post('/users', createUserHandler);

export default router;