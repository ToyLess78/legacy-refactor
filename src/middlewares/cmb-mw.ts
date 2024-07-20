import { combineMw } from '../shared/utils/utils';
import {
    validateAdminMw,
    validateTokenMw,
    validateUserIdMw,
    valTransactionSchMw,
    valUpdateUserSchMw
} from './middelewares';

export const cmbTransactionMw = combineMw(validateTokenMw, validateAdminMw, valTransactionSchMw);
export const cmbPutUserMw = combineMw(validateTokenMw, validateUserIdMw, valUpdateUserSchMw);
