import { Server } from 'http';
import { logger } from '../utils';
import { SrvLoggerMsg } from '../../enums/enums';

export const gracefulShutdown = (server: Server) => {
    const shutdown = () => {
        logger.info(SrvLoggerMsg.ReceivedKillSignal);
        server.close(() => {
            logger.info(SrvLoggerMsg.ClosedRemainingConnections);
            process.exit(0);
        });

        setTimeout(() => {
            logger.error(SrvLoggerMsg.ForcefullyShuttingDown);
            process.exit(1);
        }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
};