import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/utils/utils';

export const notFoundHandlerMw = (req: Request, res: Response, next: NextFunction) => {
    const error = AppError.notFound('Route not found');
    next(error);
};
