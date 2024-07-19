import { Server } from 'http';
import { logger } from '../utils';
import { ServerLoggerMessages } from '../../enums/enums';

export const gracefulShutdown = (server: Server) => {
    const shutdown = () => {
        logger.info(ServerLoggerMessages.ReceivedKillSignal);
        server.close(() => {
            logger.info(ServerLoggerMessages.ClosedRemainingConnections);
            process.exit(0);
        });

        setTimeout(() => {
            logger.error(ServerLoggerMessages.ForcefullyShuttingDown);
            process.exit(1);
        }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
};