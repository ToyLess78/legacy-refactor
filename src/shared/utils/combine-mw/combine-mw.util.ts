import { Request, Response, NextFunction } from 'express';

export const combineMw = (...middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        middlewares.forEach((middleware, index) => {
            middleware(req, res, (err) => {
                if (err) {
                    return next(err);
                }
                if (index === middlewares.length - 1) {
                    next();
                }
            });
        });
    };
};
