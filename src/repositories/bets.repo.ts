// src/repositories/betsRepo.ts
import { database } from '../database/database';
import { IBetsDatabaseDto } from '../shared/interfaces/bets-dto';

export const getBetsForEventRepo = async (eventId: string): Promise<IBetsDatabaseDto[]> => {
    return database<IBetsDatabaseDto>('bet').where('event_id', eventId).andWhere('win', null);
};

export const updateBetRepo = async (betId: string, win: boolean): Promise<void> => {
    await database<IBetsDatabaseDto>('bet').where('id', betId).update({ win });
};
