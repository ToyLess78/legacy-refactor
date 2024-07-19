import { NextFunction, Response } from 'express';
import { userUpdateSchema } from '../../shared/schemas/schemas';
import { AppError, formatData } from '../../shared/utils/utils';
import { asyncHandler } from '../../middlewares/middelewares';
import { updateUserService } from '../../services/services';
import { ICustomRequest } from '../../shared/interfaces/interfaces';

export const updateUser = asyncHandler(async (req: ICustomRequest, res: Response, next: NextFunction) => {
    const { error } = userUpdateSchema.validate(req.body);
    if (error) {
        return next(AppError.badRequest(error.details[0].message));
    }

    const tokenPayload = req.user!;
    const result = await updateUserService(req.params.id, req.body, tokenPayload.id);

    const formattedUser = formatData(result);

    res.send(formattedUser);
});