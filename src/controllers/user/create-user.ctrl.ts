import { Request, Response } from 'express';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { createUserSvc } from '../../services/services';
import { statEmitter } from '../../events/stats-emitter.events';

export const createUserCtrl = asyncHandlerMw(async (req: Request, res: Response) => {
    const userData = req.body;

    const result = await createUserSvc(userData);

    statEmitter.emit('newUser');

    res.send(result);
});