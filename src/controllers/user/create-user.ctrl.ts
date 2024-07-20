import { NextFunction, Request, Response } from 'express';
import { userCreateSch } from '../../shared/schemas/schemas';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { AppError, formatUserData } from '../../shared/utils/utils';
import { createUserSvc } from '../../services/services';

export const createUserCtrl = asyncHandlerMw(async (req: Request, res: Response, next: NextFunction) => {
    // const { error } = userCreateSch.validate(req.body);
    // if (error) {
    //     return next(AppError.badRequest(error.details[0].message));
    // }

    const userData = req.body;

    const result = await createUserSvc(userData);
    const formattedUser = formatUserData(result);

    res.send(formattedUser);
});