import { Request, Response } from 'express';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { createUserSvc } from '../../services/services';

export const createUserCtrl = asyncHandlerMw(async (req: Request, res: Response) => {
    const userData = req.body;

    const result = await createUserSvc(userData);

    res.send(result);
});