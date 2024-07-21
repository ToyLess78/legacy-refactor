export interface IEventRequestDto {
    type: string;
    homeTeam: string;
    awayTeam: string;
    startAt: string;
    odds: IOddsRequestDto;
}

export interface IOddsRequestDto {
    homeWin: number;
    awayWin: number;
    draw: number;
}