import { AppError } from '../utils';
import { getEventByIdRepo } from '../../../repositories/events.repo';
import { getOddsByIdRepo } from '../../../repositories/odds.repo';

export const validateEventExists = async (eventId: string) => {
    const event = await getEventByIdRepo(eventId);
    if (!event) {
        throw AppError.notFound('Event not found');
    }
    return event;
};

export const validateOddsExists = async (oddsId: string) => {
    const odds = await getOddsByIdRepo(oddsId);
    if (!odds) {
        throw AppError.notFound('Odds not found');
    }
    return odds;
};