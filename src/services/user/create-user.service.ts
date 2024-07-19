import { IUserDatabaseDto, IUserRequestDto } from '../../shared/interfaces/user-dto';
import { createToken, withErrorHandling } from '../../shared/utils/utils';
import { addUserToDatabase } from '../../repositories/user.repository';

export const createUser = (userData: IUserRequestDto): Promise<IUserDatabaseDto & { accessToken: string }> => {
    return withErrorHandling(async () => {
        const result = await addUserToDatabase(userData);
        const accessToken = createToken(result.id, result.type);

        return {
            ...result,
            accessToken
        };
    });
};