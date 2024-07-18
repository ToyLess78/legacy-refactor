import { Request, Response, NextFunction } from 'express';
import { AppError, logger } from '../utils/utils';

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
};
