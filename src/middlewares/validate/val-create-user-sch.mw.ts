import { NextFunction, Response } from 'express';
import { AppError } from '../../shared/utils/utils';
import { ICustomRequest } from '../../shared/interfaces/interfaces';
import { userCreateSch } from '../../shared/schemas/schemas';

export const valCreateUserSchMw = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const { error } = userCreateSch.validate(req.body);
    if (error) {
        return next(AppError.badRequest(error.details[0].message));
    }
    next();
};