import { User } from '../shared/interfaces/user';
import { database } from '../database/database';

export const getUserById = async (id: string): Promise<User | null> => {
    const result = await database<User>('user').where('id', id).first();
    return result || null;
};

export const updateUserById = async (id: string, userData: Partial<User>): Promise<User | null> => {
    const [result] = await database<User>('user').where('id', id).update(userData).returning('*');
    return result || null;
};
