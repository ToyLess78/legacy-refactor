import { createBetSvc } from '../../services/services';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { ICustomRequest } from '../../shared/interfaces/custom-req';
import { Response } from 'express';
import { IBetRequestDto } from '../../shared/interfaces/bets-dto';

export const createBetsCtrl = asyncHandlerMw(async (req: ICustomRequest, res: Response) => {
    const betData = req.body as IBetRequestDto;
    const {id} = req.user!;
        const result = await createBetSvc({...betData, userId: id});
        res.send(result);
});