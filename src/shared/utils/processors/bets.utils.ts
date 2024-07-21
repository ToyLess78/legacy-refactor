import { updateBetRepo } from '../../../repositories/bets.repo';
import { updateUserBalanceRepo } from '../../../repositories/events.repo';
import { IBetsDatabaseDto } from '../../interfaces/bets-dto';

export const processBet = async (bet: IBetsDatabaseDto, result: string): Promise<void> => {
    if (bet.prediction === result) {
        await updateBetRepo(bet.id, true);
        await updateUserBalanceRepo(bet.user_id, bet.bet_amount * bet.multiplier);
    } else {
        await updateBetRepo(bet.id, false);
    }
};
