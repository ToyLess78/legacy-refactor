import { Response } from 'express';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { updateUserSvc } from '../../services/services';
import { ICustomRequest } from '../../shared/interfaces/interfaces';

export const updateUserCtrl = asyncHandlerMw(async (req: ICustomRequest, res: Response) => {

    const tokenPayload = req.user!;
    const result = await updateUserSvc(req.params.id, req.body, tokenPayload.id);

    res.send(result);
});