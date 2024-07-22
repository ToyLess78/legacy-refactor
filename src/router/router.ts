import express from 'express';

import { valCreateUserSchMw, validateUserIdMw } from '../middlewares/middelewares';
import { updateUserCtrl } from '../controllers/user/update-user.ctrl';
import {
    createEventsCtrl,
    createUserCtrl,
    getUserByIdCtrl,
    healthCtrl,
    transactionsCtrl, updateEventCtrl
} from '../controllers/controllers';
import { cmbEventsMw, cmbPutUserMw, cmbTransactionMw, cmbUpEventsMw } from '../middlewares/cmb-mw';

const router = express.Router();

router.get('/health', healthCtrl);

router.get('/users/:id', validateUserIdMw, getUserByIdCtrl);
router.put('/users/:id', cmbPutUserMw, updateUserCtrl);
router.post('/users', valCreateUserSchMw, createUserCtrl);

router.post('/transactions', cmbTransactionMw, transactionsCtrl);

router.post('/events', cmbEventsMw, createEventsCtrl);
router.put('/events/:id', cmbUpEventsMw, updateEventCtrl);

export default router;