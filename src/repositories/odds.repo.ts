import { database } from '../database/database';

export const getOddsByIdRepo = async (oddsId: string) => {
    return database('odds').where('id', oddsId).first();
};