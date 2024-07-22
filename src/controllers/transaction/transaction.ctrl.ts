import { Response } from 'express';
import { asyncHandlerMw } from '../../middlewares/middelewares';
import { AppError } from '../../shared/utils/utils';
import { ICustomRequest, ITransactionRequestDto } from '../../shared/interfaces/interfaces';
import { transactionSvc } from '../../services/services';
import { getUserByIdRepo } from '../../repositories/user.repo';

export const transactionsCtrl = asyncHandlerMw(async (req: ICustomRequest, res: Response) => {
    const transactionData = req.body as unknown as ITransactionRequestDto;

    const user = await getUserByIdRepo(transactionData.userId);
    if (!user) {
        throw AppError.badRequest('User does not exist');
    }

    const result = await transactionSvc(transactionData);
    res.send(result);
});
