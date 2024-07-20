import { NextFunction, Request, Response } from 'express';
import { AppError, logger } from '../../shared/utils/utils';

export const errorHandlerMw = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.status(err.statusCode || 500).json({
        error: err.message || 'Internal Server Error',
    });
    next();
};
