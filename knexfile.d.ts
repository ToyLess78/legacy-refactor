import { Knex } from 'knex';

declare const config: {
    development: Knex.Config;
    [key: string]: Knex.Config;
};

export = config;
