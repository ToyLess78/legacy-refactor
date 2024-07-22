import {
    getMultiplier,
    toCamelCase,
    toSnakeCase,
    validateEventExists,
    validateOddsExists,
    validateUserBalance,
    validateUserExists
} from '../../shared/utils/utils';
import { IBetRequestDto, IBetResponseDto } from '../../shared/interfaces/bets-dto';
import { addBetRepo } from '../../repositories/bets.repo';

export const createBetSvc = async (betData: IBetRequestDto): Promise<IBetResponseDto> => {
    const user = await validateUserExists(betData.userId);
    validateUserBalance(user, betData.betAmount);

    const event = await validateEventExists(betData.eventId);
    const odds = await validateOddsExists(event.odds_id);

    const multiplier = getMultiplier(betData.prediction, odds);

    const snakeCaseData = toSnakeCase({
        ...betData,
        userBalance: user.balance,
        multiplier,
    });

    const result = await addBetRepo(snakeCaseData);

    return {
        ...toCamelCase(result),
        currentBalance: user.balance - betData.betAmount,
    };
};