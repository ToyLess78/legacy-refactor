import { Request, Response, NextFunction } from 'express';
import { validateUserIdSchema } from '../../shared/schemas/schemas';
import joi from 'joi';
import { AppError } from '../../shared/utils/utils';

export const validateUserId = (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object(validateUserIdSchema);

    const { error } = schema.validate(req.params);
    if (error) {
        return next(AppError.badRequest(error.details[0].message));
    }
    next();
};
