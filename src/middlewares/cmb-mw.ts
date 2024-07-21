import { combineMw } from '../shared/utils/utils';
import {
    valCreateEventSchMw,
    validateAdminMw,
    validateTokenMw,
    validateUserIdMw,
    valTransactionSchMw,
    valUpdateUserSchMw
} from './middelewares';

export const cmbTransactionMw = combineMw(validateTokenMw, validateAdminMw, valTransactionSchMw);
export const cmbPutUserMw = combineMw(validateTokenMw, validateUserIdMw, valUpdateUserSchMw);
export const cmbEventsMw = combineMw(validateTokenMw, validateAdminMw, valCreateEventSchMw);
