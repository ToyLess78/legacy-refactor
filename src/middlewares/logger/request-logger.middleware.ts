import { Request, Response, NextFunction } from 'express';
import { logger } from '../../shared/utils/utils';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { method, url } = req;
    const timestamp = new Date().toISOString();

    logger.info(`[${timestamp}] Incoming request: ${method} ${url}`);

    res.on('finish', () => {
        const duration = Date.now() - start;
        const { statusCode } = res;
        logger.info(`[${timestamp}] ${method} ${url} - ${statusCode} [${duration}ms]`);
    });

    next();
};
