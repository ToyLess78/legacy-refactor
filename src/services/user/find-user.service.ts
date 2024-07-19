import { getUserById } from '../../repositories/user.repository';
import { IUserDatabaseDto } from '../../shared/interfaces/user-dto';
import { AppError } from '../../shared/utils/utils';

export const findUserById = async (id: string): Promise<IUserDatabaseDto | null> => {
    const user = await getUserById(id);
    if (!user) {
        throw AppError.notFound('User not found');
    }
    return user;
};
