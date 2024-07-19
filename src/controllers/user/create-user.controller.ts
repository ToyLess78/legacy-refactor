import { NextFunction, Request, Response } from 'express';
import { userCreateSchema } from '../../shared/schemas/schemas';
import { asyncHandler } from '../../middlewares/middelewares';
import { AppError, formatData } from '../../shared/utils/utils';
import { createUser } from '../../services/services';

export const createUserHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { error } = userCreateSchema.validate(req.body);
    if (error) {
        return next(AppError.badRequest(error.details[0].message));
    }

    const userData = req.body;

    const result = await createUser(userData);
    const formattedUser = formatData(result);

    res.send(formattedUser);
});