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
