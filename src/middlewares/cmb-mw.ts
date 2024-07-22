import { combineMw } from '../shared/utils/utils';
import {
    valCreateBetsSchMw,
    valCreateEventSchMw,
    validateAdminMw,
    validateTokenMw,
    validateUserIdMw,
    valTransactionSchMw,
    valUpdateUserSchMw
} from './middelewares';
import { valUpdateEventSchMw } from './validate/val-update-event-sch.mw';

export const cmbTransactionMw = combineMw(validateTokenMw, validateAdminMw, valTransactionSchMw);
export const cmbPutUserMw = combineMw(validateTokenMw, validateUserIdMw, valUpdateUserSchMw);
export const cmbEventsMw = combineMw(validateTokenMw, validateAdminMw, valCreateEventSchMw);
export const cmbUpEventsMw = combineMw(validateTokenMw, validateAdminMw, valUpdateEventSchMw);
export const cmbUpBetsMw = combineMw(validateTokenMw, valCreateBetsSchMw);
export const cmbStatsMw = combineMw(validateTokenMw, validateAdminMw);
