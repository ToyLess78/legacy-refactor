import { ICustomRequest } from '../../shared/interfaces/custom-req';
import { NextFunction, Response } from 'express';
import { AppError } from '../../shared/utils/utils';
import { eventsUpdateSch } from '../../shared/schemas/schemas';

export const valUpdateEventSchMw = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const { error } = eventsUpdateSch.validate(req.body);
    if (error) {
        return next(AppError.badRequest(error.details[0].message));
    }
    next();
};