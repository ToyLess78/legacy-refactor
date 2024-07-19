import { Response } from 'express';
import { asyncHandler } from '../../middlewares/middelewares';
import { findUserById } from '../../services/services';
import { ICustomRequest } from '../../shared/interfaces/interfaces';
import { formatData } from '../../shared/utils/utils';

export const getUserById = asyncHandler(async (req: ICustomRequest, res: Response) => {
    const result = await findUserById(req.params.id);

    if (result) {
        const formattedUser = formatData(result);

        res.send(formattedUser)
    }
});
