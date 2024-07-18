import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/async-handler.middleware';
import { findUserById } from '../services/user.service';

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await findUserById(req.params.id);

    if (user)
    res.send({
        ...user,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
    });
});
