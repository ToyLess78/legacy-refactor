import { NextFunction, Response } from 'express';
import { AppError } from '../../shared/utils/utils';
import { ICustomRequest } from '../../shared/interfaces/interfaces';
import { transactionCreateSch } from '../../shared/schemas/transactions/transaction-create.sch';

export const valTransactionSchMw = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const { error } = transactionCreateSch.validate(req.body);
    if (error) {
        return next(AppError.badRequest(error.details[0].message));
    }
    next();
};