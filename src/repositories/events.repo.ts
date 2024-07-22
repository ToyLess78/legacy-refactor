import { database } from '../database/database';
import { IEventDatabaseDto, IEventDatabaseResponseDto, IOddsDatabaseDto } from '../shared/interfaces/event-dto';

export const addEventRepo = async (eventDbData: IEventDatabaseDto, oddsData: IOddsDatabaseDto): Promise<IEventDatabaseResponseDto> => {

    return database.transaction(async trx => {
        const [odds] = await trx<IOddsDatabaseDto>('odds').insert(oddsData).returning('*');
        eventDbData.odds_id = odds.id;

        const [event] = await trx<IEventDatabaseDto>('event').insert(eventDbData).returning('*');
        return {...event, odds};
    })
}

export const updateEventScoreRepo = async (eventId: string, score: string): Promise<IEventDatabaseDto | null> => {
    const [event] = await database('event')
        .where('id', eventId)
        .update({ score })
        .returning('*');

    return event ? event : null;
};

export const updateUserBalanceRepo = async (userId: string, amount: number): Promise<void> => {
    await database('user')
        .where('id', userId)
        .increment('balance', amount);
};

export const getEventByIdRepo = async (eventId: string) => {
    return database('event').where('id', eventId).first();
};

