import { Response } from 'express';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { findUserByIdSvc } from '../../services/services';
import { ICustomRequest } from '../../shared/interfaces/interfaces';

export const getUserByIdCtrl = asyncHandlerMw(async (req: ICustomRequest, res: Response) => {
    const result = await findUserByIdSvc(req.params.id);

        res.send(result)
});
