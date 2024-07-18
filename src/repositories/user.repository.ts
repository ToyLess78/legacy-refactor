import { User } from '../shared/models/models';
import { database } from '../database/database';

export const getUserById = async (id: string): Promise<User | null> => {
    const result = await database<User>('user').where('id', id).first();
    return result || null;
};
