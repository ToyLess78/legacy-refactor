import { EventEmitter } from 'events';

interface Stats {
    totalUsers: number;
    totalBets: number;
    totalEvents: number;
}

export const stats: Stats = {
    totalUsers: 3,
    totalBets: 1,
    totalEvents: 1,
};

export const statEmitter = new EventEmitter();
