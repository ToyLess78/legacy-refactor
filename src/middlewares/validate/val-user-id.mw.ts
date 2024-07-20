import { NextFunction, Request, Response } from 'express';
import { validateUserIdSch } from '../../shared/schemas/schemas';
import joi from 'joi';
import { AppError } from '../../shared/utils/utils';

export const validateUserIdMw = (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object(validateUserIdSch);

    const { error } = schema.validate(req.params);
    if (error) {
        return next(AppError.badRequest(error.details[0].message));
    }
    next();
};
