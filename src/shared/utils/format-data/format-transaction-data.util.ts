import { ITransactionDatabaseDto, ITransactionResponseDto } from '../../interfaces/transaction-dto';

export const formatTransactionData = (transaction: ITransactionDatabaseDto, currentBalance: number): ITransactionResponseDto => {
    return {
        ...transaction,
        currentBalance
    };
};