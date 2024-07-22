export interface IBetsDatabaseDto {
    id: string;
    user_id: string;
    event_id: string;
    bet_amount: number;
    multiplier: number;
    prediction: 'w1' | 'w2' | 'x';
    win: boolean | null;
    user_balance: number;
    created_at: Date;
    updated_at: Date;
}

interface IBaseBetDto {
    userId: string;
    eventId: string;
    betAmount: number;
    prediction: 'w1' | 'w2' | 'x';
    multiplier: number;
}

export interface IBetRequestDto extends IBaseBetDto {
    win?: boolean | null;
}

export interface IBetResponseDto extends IBaseBetDto {
    id: string;
    win: boolean | null;
    createdAt: Date;
    updatedAt: Date;
    currentBalance: number;
}

