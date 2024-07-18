import pino from 'pino';
import pinoPretty from 'pino-pretty';

const prettyStream = pinoPretty({
    colorize: true,
});

export const logger = pino(
    { level: 'info' },
    prettyStream
);
