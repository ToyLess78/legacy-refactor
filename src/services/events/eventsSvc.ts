import { toCamelCase, toSnakeCase } from '../../shared/utils/utils';
import { addEventRepo } from '../../repositories/events.repo';
import { IEventDatabaseDto, IEventRequestDto, IEventResponseDto } from '../../shared/interfaces/event-dto';

export const eventSvc = async (eventData: IEventRequestDto): Promise<IEventResponseDto> => {
    const {odds, ...event} = eventData;
    const oddsData = toSnakeCase(eventData.odds);
    const eventDbData = toSnakeCase(event) as IEventDatabaseDto;

    const result = await addEventRepo(eventDbData, oddsData);
    return toCamelCase(result);
};