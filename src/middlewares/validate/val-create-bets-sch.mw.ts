import { ICustomRequest } from '../../shared/interfaces/custom-req';
import { NextFunction, Response } from 'express';
import { AppError } from '../../shared/utils/utils';
import { betsCreateSch } from '../../shared/schemas/schemas';

export const valCreateBetsSchMw = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const { error } = betsCreateSch.validate(req.body);
    if (error) {
        return next(AppError.badRequest(error.details[0].message));
    }
    next();
};