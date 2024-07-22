export interface IBetsDatabaseDto {
    id: string;
    user_id: string;
    event_id: string;
    bet_amount: number;
    multiplier: number;
    prediction: string;
    win: boolean | null;
}