import { Request, Response, NextFunction } from 'express';
import { userIdSchema } from '../shared/schemas/user-id.schema';
import joi from 'joi';
import { AppError } from '../shared/utils/app-error.util';

export const validateUserId = (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object(userIdSchema);

    const { error } = schema.validate(req.params);
    if (error) {
        return next(AppError.badRequest(error.details[0].message));
    }
    next();
};
