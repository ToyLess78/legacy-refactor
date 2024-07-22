import { createBetSvc } from '../../services/services';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { ICustomRequest } from '../../shared/interfaces/custom-req';
import { Response } from 'express';
import { IBetRequestDto } from '../../shared/interfaces/bets-dto';
import { statEmitter } from '../../events/stats-emitter.events';
import { JwtPayload } from 'jsonwebtoken';

export const createBetsCtrl = asyncHandlerMw(async (req: ICustomRequest, res: Response) => {
    const betData = req.body as IBetRequestDto;
    const {id} = req.user as JwtPayload & { id: string; type: string };

    const result = await createBetSvc({...betData, userId: id});

    statEmitter.emit('newBet');

    res.send(result);
});