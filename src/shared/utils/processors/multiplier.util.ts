import { IOddsDatabaseDto } from '../../interfaces/event-dto';
import { AppError } from '../utils';

export const getMultiplier = (prediction: 'w1' | 'w2' | 'x', odds: IOddsDatabaseDto): number => {
    switch (prediction) {
        case 'w1':
            return odds.home_win;
        case 'w2':
            return odds.away_win;
        case 'x':
            return odds.draw;
        default:
            throw AppError.badRequest('Invalid prediction');
    }
};
