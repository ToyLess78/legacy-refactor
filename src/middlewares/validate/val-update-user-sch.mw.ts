import { ICustomRequest } from '../../shared/interfaces/custom-req';
import { NextFunction, Response } from 'express';
import { AppError } from '../../shared/utils/error/app-error.util';
import { userUpdateSch } from '../../shared/schemas/schemas';

export const valUpdateUserSchMw = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const { error } = userUpdateSch.validate(req.body);
    if (error) {
        return next(AppError.badRequest(error.details[0].message));
    }
    next();
};