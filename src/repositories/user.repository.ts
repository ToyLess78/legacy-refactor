import { IUserDatabaseDto, IUserRequestDto } from '../shared/interfaces/user-dto';
import { database } from '../database/database';

export const getUserById = async (id: string): Promise<IUserDatabaseDto | null> => {
    const result = await database<IUserDatabaseDto>('user').where('id', id).first();
    return result || null;
};

export const updateUserById = async (id: string, userData: Partial<IUserDatabaseDto>): Promise<IUserDatabaseDto | null> => {
    const [result] = await database<IUserDatabaseDto>('user').where('id', id).update(userData).returning('*');
    return result || null;
};

export const addUserToDatabase = async (userData: IUserRequestDto): Promise<IUserDatabaseDto> => {
    const userWithDefaults: IUserDatabaseDto = { ...userData, balance: 0, city: null, created_at: new Date(), updated_at: new Date() };
    const [result] = await database<IUserDatabaseDto>('user').insert(userWithDefaults).returning('*');
    return result;
};
