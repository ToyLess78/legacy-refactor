import { IUserDatabaseDto, IUserRequestDto } from '../shared/interfaces/user-dto';
import { database } from '../database/database';

export const getUserByIdRepo = async (id: string): Promise<IUserDatabaseDto | null> => {
    const result = await database<IUserDatabaseDto>('user').where('id', id).first();
    return result || null;
};

export const updateUserByIdRepo = async (id: string, userData: Partial<IUserDatabaseDto>): Promise<IUserDatabaseDto | null> => {
    const [result] = await database<IUserDatabaseDto>('user').where('id', id).update(userData).returning('*');
    return result || null;
};

export const addUserRepo = async (userData: IUserRequestDto): Promise<IUserDatabaseDto> => {
    const userWithDefaults = { ...userData, balance: 0 };
    const [result] = await database<IUserDatabaseDto>('user').insert(userWithDefaults).returning('*');
    return result;
};
