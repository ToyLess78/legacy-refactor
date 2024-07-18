import { getUserById } from '../repositories/user.repository';
import { User } from '../shared/interfaces/user';
import { AppError } from '../shared/utils/utils';

export const findUserById = async (id: string): Promise<User | null> => {
    const user = await getUserById(id);
    if (!user) {
        throw AppError.notFound('User not found');
    }
    return user;
};
