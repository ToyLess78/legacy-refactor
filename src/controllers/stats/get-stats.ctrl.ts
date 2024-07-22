import { Response } from 'express';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { ICustomRequest } from '../../shared/interfaces/interfaces';
import { stats } from '../../events/stats-emitter.events';

export const getStatsCtrl = asyncHandlerMw(async (req: ICustomRequest, res: Response) => {
    res.send(stats);
});
