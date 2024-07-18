import { database } from '../database/database';
import { logger } from './utils';
import { DatabaseLoggerMessages } from '../libs/enums/enums';

export const validateDbConnection = async () => {
    const result = await database.raw('select 1+1 as result');
    if (!result) {
        logger.error(DatabaseLoggerMessages.ConnectionFailedNoResult);
        process.exit(1);
    }
    logger.info(DatabaseLoggerMessages.ConnectionSuccessful);
};
