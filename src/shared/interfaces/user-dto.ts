export interface IUserRequestDto {
    id: string;
    type: string;
    phone: string;
    name: string;
    email: string;
}

export interface IUserDatabaseDto extends IUserRequestDto{
    balance: number;
    city: null | string;
    accessToken?: string;
    created_at: Date | string;
    updated_at: Date | string;
}

export type IUserResponseDto = Omit<IUserDatabaseDto, 'created_at' | 'updated_at'> & {
    createdAt: Date | string;
    updatedAt: Date | string;
};