import { AppError, withErrorHandling } from '../shared/utils/utils';
import { updateUserById } from '../repositories/repositories';
import { User } from '../shared/interfaces/user';

export const updateUserService = (id: string, userData: Partial<User>, tokenPayloadId: string): Promise<User> => {
    if (id !== tokenPayloadId) {
        return Promise.reject(AppError.unauthorized('UserId mismatch'));
    }

    return withErrorHandling(async () => {
        const result = await updateUserById(id, userData);
        if (!result) {
            throw AppError.notFound('User not found');
        }
        return result;
    });
};