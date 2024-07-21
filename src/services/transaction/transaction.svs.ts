import { database } from '../../database/database';
import { ITransactionRequestDto, ITransactionResponseDto } from '../../shared/interfaces/transaction-dto';
import { AppError, formatTransactionData, toCamelCase, toSnakeCase, withErrorHandling } from '../../shared/utils/utils';
import { addTransactionRepo, getUserByIdRepo, updateUserBalanceRepo } from '../../repositories/repositories';

export const transactionSvc = (transactionData: ITransactionRequestDto): Promise<ITransactionResponseDto | null> => {
    return withErrorHandling(async () => {
        const user = await getUserByIdRepo(transactionData.userId);
        if (!user) {
            throw AppError.badRequest('User does not exist');
        }

        const snakeCaseData = toSnakeCase(transactionData);

        const result = await database.transaction(async _ => {
            const transactionResult = await addTransactionRepo(snakeCaseData);
            await updateUserBalanceRepo(transactionData.userId, transactionData.amount);
            return transactionResult;
        });
        const formatData = formatTransactionData(result, user.balance + transactionData.amount);

        return toCamelCase(formatData);
    });
};
