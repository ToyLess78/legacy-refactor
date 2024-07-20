import { IUserDatabaseDto } from '../shared/interfaces/user-dto';
import { database } from '../database/database';
import { ITransactionDatabaseDto, ITransactionRequestDto } from '../shared/interfaces/transaction-dto';
import { toCamelCase, toSnakeCase } from '../shared/utils/utils';

export const addTransactionRepo = async (transactionData: ITransactionRequestDto): Promise<ITransactionDatabaseDto> => {
    const snakeCaseData = toSnakeCase(transactionData);
    const [result] = await database<ITransactionDatabaseDto>('transaction').insert(snakeCaseData).returning('*');
    return toCamelCase(result);
};

export const updateUserBalanceRepo = async (userId: string, amount: number): Promise<void> => {
    await database<IUserDatabaseDto>('user').where('id', userId).increment('balance', amount);
};