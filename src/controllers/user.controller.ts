import { Request, Response, NextFunction } from 'express';
import { userUpdateSchema } from '../shared/schemas/user-update.schema';
import { AppError } from '../shared/utils/utils';
import { asyncHandler } from '../middlewares/middelewares';
import { updateUserService } from '../services/services';
import { CustomRequest } from '../shared/interfaces/custom-request';

export const updateUser = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { error } = userUpdateSchema.validate(req.body);
    if (error) {
        return next(AppError.badRequest(error.details[0].message));
    }

    const tokenPayload = req.user!;
    const result = await updateUserService(req.params.id, req.body, tokenPayload.id);

    res.send({
        ...result,
        createdAt: result.created_at,
        updatedAt: result.updated_at,
    });
});