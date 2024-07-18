import knex from 'knex';
import { Knex } from 'knex';
import { config as dataBaseConfig } from './knex-file';

export const database: Knex = knex(dataBaseConfig.development);
