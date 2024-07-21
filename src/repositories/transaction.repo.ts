import { IUserDatabaseDto } from '../shared/interfaces/user-dto';
import { database } from '../database/database';
import { ITransactionDatabaseDto } from '../shared/interfaces/transaction-dto';

export const addTransactionRepo = async (transactionData: ITransactionDatabaseDto): Promise<ITransactionDatabaseDto> => {
    const [result] = await database<ITransactionDatabaseDto>('transaction').insert(transactionData).returning('*');
    return result;
};

export const updateUserBalanceRepo = async (userId: string, amount: number): Promise<void> => {
    await database<IUserDatabaseDto>('user').where('id', userId).increment('balance', amount);
};