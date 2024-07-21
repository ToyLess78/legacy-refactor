import { IEventDatabaseDto } from '../../shared/interfaces/event-dto';
import { getBetsForEventRepo } from '../../repositories/bets.repo';
import { determineMatchResult, processBet, toCamelCase } from '../../shared/utils/utils';
import { updateEventScoreRepo } from '../../repositories/events.repo';
import { IBetsDatabaseDto } from '../../shared/interfaces/bets-dto';

export const updateEventSvc = async (eventId: string, score: string): Promise<IEventDatabaseDto | null> => {
    const bets = await getBetsForEventRepo(eventId);
    const result = determineMatchResult(score);

    const event = await updateEventScoreRepo(eventId, score);

    await Promise.all(bets.map(async (bet: IBetsDatabaseDto) => {
        await processBet(bet, result);
    }));

    return toCamelCase(event);
};
