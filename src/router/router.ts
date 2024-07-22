import express from 'express';

import { valCreateUserSchMw, validateUserIdMw } from '../middlewares/middelewares';
import { updateUserCtrl } from '../controllers/user/update-user.ctrl';
import {
    createBetsCtrl,
    createEventsCtrl,
    createUserCtrl,
    getStatsCtrl,
    getUserByIdCtrl,
    healthCtrl,
    transactionsCtrl,
    updateEventCtrl
} from '../controllers/controllers';
import {
    cmbEventsMw,
    cmbPutUserMw,
    cmbStatsMw,
    cmbTransactionMw,
    cmbUpBetsMw,
    cmbUpEventsMw
} from '../middlewares/cmb-mw';
import { Routes } from '../shared/enums/enums';

const router = express.Router();

router.get(Routes.HEALTH, healthCtrl);
router.get(Routes.GET_USER_BY_ID, validateUserIdMw, getUserByIdCtrl);
router.put(Routes.UPDATE_USER_BY_ID, cmbPutUserMw, updateUserCtrl);
router.post(Routes.CREATE_USER, valCreateUserSchMw, createUserCtrl);
router.post(Routes.CREATE_TRANSACTION, cmbTransactionMw, transactionsCtrl);
router.post(Routes.CREATE_EVENT, cmbEventsMw, createEventsCtrl);
router.put(Routes.UPDATE_EVENT_BY_ID, cmbUpEventsMw, updateEventCtrl);
router.post(Routes.CREATE_BET, cmbUpBetsMw, createBetsCtrl);
router.get(Routes.GET_STATS, cmbStatsMw, getStatsCtrl);

export default router;