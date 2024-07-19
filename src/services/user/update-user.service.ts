import { AppError, withErrorHandling } from '../../shared/utils/utils';
import { updateUserById } from '../../repositories/repositories';
import { IUserDatabaseDto } from '../../shared/interfaces/user-dto';

export const updateUserService = (id: string, userData: Partial<IUserDatabaseDto>, tokenPayloadId: string): Promise<IUserDatabaseDto> => {
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