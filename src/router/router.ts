import express from 'express';

import { valCreateUserSchMw, validateUserIdMw } from '../middlewares/middelewares';
import { updateUserCtrl } from '../controllers/user/update-user.ctrl';
import {
    createEventsCtrl,
    createUserCtrl,
    getUserByIdCtrl,
    healthCtrl,
    transactionsCtrl
} from '../controllers/controllers';
import { cmbEventsMw, cmbPutUserMw, cmbTransactionMw } from '../middlewares/cmb-mw';

const router = express.Router();

router.get('/health', healthCtrl);

router.get('/users/:id', validateUserIdMw, getUserByIdCtrl);
router.put('/users/:id', cmbPutUserMw, updateUserCtrl);
router.post('/users', valCreateUserSchMw, createUserCtrl);

router.post('/transactions', cmbTransactionMw, transactionsCtrl);

router.post('/events', cmbEventsMw, createEventsCtrl);

export default router;