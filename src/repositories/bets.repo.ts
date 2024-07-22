import { database } from '../database/database';
import { IBetsDatabaseDto } from '../shared/interfaces/bets-dto';

export const getBetsForEventRepo = async (eventId: string): Promise<IBetsDatabaseDto[]> => {
    return database<IBetsDatabaseDto>('bet').where('event_id', eventId).andWhere('win', null);
};

export const updateBetRepo = async (betId: string, win: boolean): Promise<void> => {
    await database<IBetsDatabaseDto>('bet').where('id', betId).update({ win });
};

export const addBetRepo = async (betData: IBetsDatabaseDto): Promise<IBetsDatabaseDto> => {
    const { user_balance, ...betDataWithoutBalance } = betData;

    return await database.transaction(async trx => {
        const [insertedBet] = await trx<IBetsDatabaseDto>('bet').insert(betDataWithoutBalance).returning('*');

        await trx('user').where('id', betData.user_id).update('balance', user_balance - betData.bet_amount);
        return insertedBet;
    });
};
