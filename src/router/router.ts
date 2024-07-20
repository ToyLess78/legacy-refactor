import express from 'express';

import {
    validateAdminMw,
    validateTokenMw,
    valTransactionSchMw,
    validateUserIdMw,
    valCreateUserSchMw
} from '../middlewares/middelewares';
import { updateUserCtrl } from '../controllers/user/update-user.ctrl';
import { transactionsCtrl, createUserCtrl, getUserByIdCtrl, healthCtrl } from '../controllers/controllers';
import { cmbPutUserMw, cmbTransactionMw } from '../middlewares/cmb-mw';

const router = express.Router();

router.get('/health', healthCtrl);

router.get('/users/:id', validateUserIdMw, getUserByIdCtrl);
router.put('/users/:id', cmbPutUserMw, updateUserCtrl);
router.post('/users', valCreateUserSchMw, createUserCtrl);

router.post('/transactions', cmbTransactionMw, transactionsCtrl);

export default router;