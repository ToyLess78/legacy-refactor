import { database } from '../database/database';

export const getOddsByIdRepo = async (oddsId: string) => {
    return await database('odds').where('id', oddsId).first();
};