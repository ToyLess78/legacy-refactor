import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/utils';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(AppError.notFound('Route not found'));
};
