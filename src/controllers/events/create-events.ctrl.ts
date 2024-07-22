import { createEventSvc } from '../../services/services';
import { IEventRequestDto } from '../../shared/interfaces/event-dto';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { ICustomRequest } from '../../shared/interfaces/custom-req';
import { Response } from 'express';
import { statEmitter } from '../../events/stats-emitter.events';

export const createEventsCtrl = asyncHandlerMw(async (req: ICustomRequest, res: Response) => {
    const eventData = req.body as IEventRequestDto;

    const result = await createEventSvc(eventData);

    statEmitter.emit('newEvent');

    res.send(result);
});