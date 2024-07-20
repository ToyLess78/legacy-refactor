import { database } from '../../database/database';
import { ITransactionRequestDto, ITransactionResponseDto } from '../../shared/interfaces/transaction-dto';
import { AppError, formatTransactionData, withErrorHandling } from '../../shared/utils/utils';
import { addTransactionRepo, getUserByIdRepo, updateUserBalanceRepo } from '../../repositories/repositories';

export const transactionSvc = (transactionData: ITransactionRequestDto): Promise<ITransactionResponseDto | null> => {
    return withErrorHandling(async () => {
        const user = await getUserByIdRepo(transactionData.userId);
        if (!user) {
            throw AppError.badRequest('User does not exist');
        }

        const result = await database.transaction(async trx => {
            const transactionResult = await addTransactionRepo(transactionData);
            await updateUserBalanceRepo(transactionData.userId, transactionData.amount);
            return transactionResult;
        });

        return formatTransactionData(result, user.balance + transactionData.amount);
    });
};
