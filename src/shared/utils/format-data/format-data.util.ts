import { IUserDatabaseDto, IUserResponseDto } from '../../interfaces/user-dto';

export const formatUserData = (user: IUserDatabaseDto | IUserDatabaseDto & { accessToken: string }): IUserResponseDto => {
    const { created_at, updated_at, ...userWithoutTimestamps } = user;
    return {
        ...userWithoutTimestamps,
        createdAt: created_at,
        updatedAt: updated_at
    };
};