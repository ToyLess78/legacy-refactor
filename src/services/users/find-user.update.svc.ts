import { getUserByIdRepo } from '../../repositories/user.repo';
import { IUserDatabaseDto } from '../../shared/interfaces/user-dto';
import { AppError } from '../../shared/utils/utils';
import { transactionSvc } from '../transaction/transaction.svs';

export const findUserByIdSvc = async (id: string): Promise<IUserDatabaseDto | null> => {
    const user = await getUserByIdRepo(id);
    if (!user) {
        throw AppError.notFound('User not found');
    }
    return user;
};
