import { IUserDatabaseDto, IUserRequestDto } from '../../shared/interfaces/user-dto';
import { createToken, withErrorHandling } from '../../shared/utils/utils';
import { addUserRepo } from '../../repositories/user.repo';

export const createUserSvc = (userData: IUserRequestDto): Promise<IUserDatabaseDto & { accessToken: string }> => {
    return withErrorHandling(async () => {
        const result = await addUserRepo(userData);
        const accessToken = createToken(result.id, result.type);

        return {
            ...result,
            accessToken
        };
    });
};