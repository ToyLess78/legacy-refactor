import { database } from '../../../database/database';
import { logger } from '../utils';
import { DbLoggerMsg } from '../../enums/enums';

export const validateDbConnection = async () => {
    const result = await database.raw('select 1+1 as result');
    if (!result) {
        logger.error(DbLoggerMsg.ConnectionFailedNoResult);
        process.exit(1);
    }
    logger.info(DbLoggerMsg.ConnectionSuccessful);
};
