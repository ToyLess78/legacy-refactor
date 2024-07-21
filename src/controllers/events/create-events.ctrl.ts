import { eventSvc } from '../../services/services';
import { IEventRequestDto } from '../../shared/interfaces/event-dto';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { ICustomRequest } from '../../shared/interfaces/custom-req';
import { Response } from 'express';

export const createEventsCtrl = asyncHandlerMw(async (req: ICustomRequest, res: Response) => {
    const eventData = req.body as IEventRequestDto;

        const result = await eventSvc(eventData);

        res.send(result);
});