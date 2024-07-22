import { getUserByIdRepo } from '../../../repositories/user.repo';
import { AppError } from '../utils';

export const validateUserExists = async (userId: string) => {
    const user = await getUserByIdRepo(userId);
    if (!user) {
        throw AppError.badRequest('User does not exist');
    }
    return user;
};

export const validateUserBalance = (user: { balance: number }, betAmount: number) => {
    if (user.balance < betAmount) {
        throw AppError.badRequest('Not enough balance');
    }
};
