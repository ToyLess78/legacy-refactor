import { NextFunction, Response } from 'express';
import { userUpdateSch } from '../../shared/schemas/schemas';
import { AppError, formatUserData } from '../../shared/utils/utils';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { updateUserSvc } from '../../services/services';
import { ICustomRequest } from '../../shared/interfaces/interfaces';

export const updateUserCtrl = asyncHandlerMw(async (req: ICustomRequest, res: Response, next: NextFunction) => {
    // const { error } = userUpdateSch.validate(req.body);
    // if (error) {
    //     return next(AppError.badRequest(error.details[0].message));
    // }

    const tokenPayload = req.user!;
    const result = await updateUserSvc(req.params.id, req.body, tokenPayload.id);

    const formattedUser = formatUserData(result);

    res.send(formattedUser);
});