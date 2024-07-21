import { NextFunction, Request, Response } from 'express';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { createUserSvc } from '../../services/services';

export const createUserCtrl = asyncHandlerMw(async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    const result = await createUserSvc(userData);

    res.send(result);
});