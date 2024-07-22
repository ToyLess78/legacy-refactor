import { AppError, toCamelCase, withErrorHandling } from '../../shared/utils/utils';
import { updateUserByIdRepo } from '../../repositories/user.repo';
import { IUserDatabaseDto } from '../../shared/interfaces/user-dto';

export const updateUserSvc = (id: string, userData: Partial<IUserDatabaseDto>, tokenPayloadId: string): Promise<IUserDatabaseDto> => {
    if (id !== tokenPayloadId) {
        return Promise.reject(AppError.unauthorized('UserId mismatch'));
    }

    return withErrorHandling(async () => {
        const result = await updateUserByIdRepo(id, userData);
        if (!result) {
            throw AppError.notFound('User not found');
        }
        return toCamelCase(result);
    });
};