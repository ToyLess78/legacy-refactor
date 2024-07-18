import { Response } from 'express';
import { asyncHandler } from '../middlewares/async-handler.middleware';
import { findUserById } from '../services/find-user.service';
import { CustomRequest } from '../shared/interfaces/custom-request';

export const getUserById = asyncHandler(async (req: CustomRequest, res: Response) => {
    const user = await findUserById(req.params.id);

    if (user)
    res.send({
        ...user,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
    });
});
