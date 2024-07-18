import { logger } from './logger.util';
import { EnvLoggerMessages } from '../libs/enums/enums';

const requiredEnvVars = [
    'DATABASE_PORT',
    'DATABASE_HOST',
    'DATABASE_NAME',
    'DATABASE_USER',
    'DATABASE_ACCESS_KEY',
    'JWT_SECRET',
];

export const validateEnv = () => {
    const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

    if (missingEnvVars.length > 0) {
        logger.error(`${EnvLoggerMessages.MissingEnvVars} ${missingEnvVars.join(', ')}`);
        process.exit(1);
    }
    logger.info(EnvLoggerMessages.AllEnvVarsSet);
};
