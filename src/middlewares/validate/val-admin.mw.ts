import { NextFunction, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../shared/utils/utils';
import { ICustomRequest } from '../../shared/interfaces/interfaces';

export const validateAdminMw = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const tokenPayload = req.user as JwtPayload & { id: string; type: string };

    if (tokenPayload?.type !== 'admin') {
        return next(AppError.unauthorized());
    }

    next();
};