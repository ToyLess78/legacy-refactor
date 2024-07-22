export interface IBetsDatabaseDto {
    id: string;
    user_id: string;
    event_id: string;
    bet_amount: number;
    multiplier: number;
    prediction: 'w1' | 'w2' | 'x';
    win: boolean | null;
    user_balance: number;
}

export interface IBetRequestDto {
    userId: string;
    eventId: string;
    betAmount: number;
    multiplier: number;
    prediction: 'w1' | 'w2' | 'x';
    win?: boolean | null;
}

export interface IBetResponseDto {
    id: string;
    userId: string;
    eventId: string;
    betAmount: number;
    multiplier: number;
    prediction: 'w1' | 'w2' | 'x';
    win: boolean | null;
    createdAt: string;
    updatedAt: string;
    currentBalance: number;
}