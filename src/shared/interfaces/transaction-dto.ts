export interface ITransactionRequestDto {
    id: string;
    userId: string;
    cardNumber: string;
    amount: number;
}

export interface ITransactionDatabaseDto extends ITransactionRequestDto {
    createdAt: Date | string;
    updatedAt: Date | string;
}

export type ITransactionResponseDto = Omit<ITransactionDatabaseDto, 'amount'> & {
    currentBalance: number;
};