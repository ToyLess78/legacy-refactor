import { NextFunction, Response } from 'express';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { ICustomRequest } from '../../shared/interfaces/custom-req';
import { updateEventSvc } from '../../services/services';
import { AppError } from '../../shared/utils/utils';

export const updateEventCtrl = asyncHandlerMw(async (req: ICustomRequest, res: Response, next: NextFunction) => {
    const eventId = req.params.id;
    const { score } = req.body;

    const result = await updateEventSvc(eventId, score);

    if (!result) {
        return next(AppError.notFound('Event not found'))
    }

    res.send(result);
});
