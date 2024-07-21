export interface IOddsBase {
    homeWin: number;
    awayWin: number;
    draw: number;
}

export interface IOddsRequestDto extends IOddsBase {}

export interface IOddsDatabaseDto extends IOddsBase {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOddsResponseDto extends IOddsBase {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IEventBase {
    type: string;
    homeTeam: string;
    awayTeam: string;
    startAt: string;
}

export interface IEventRequestDto extends IEventBase {
    odds: IOddsRequestDto;
}

export interface IEventDatabaseDto extends Omit<IEventBase, 'startAt'> {
    id: string;
    home_team: string;
    away_team: string;
    start_at: Date;
    created_at: Date;
    updated_at: Date;
    odds_id: string;
}

export interface IEventDatabaseResponseDto extends IEventDatabaseDto {
    odds: IOddsDatabaseDto;
}

export interface IEventResponseDto extends IEventBase {
    id: string;
    oddsId: string;
    score: string;
    createdAt: string;
    updatedAt: string;
    odds: IOddsResponseDto;
}