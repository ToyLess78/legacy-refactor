import express from 'express';
import { errorHandler, notFoundHandler, requestLogger } from './middlewares/middelewares';
import router from './routes/routes';
import { statEmitter, stats } from './events/stats-emitter.events';
import { logger, validateDbConnection, gracefulShutdown, validateEnv  } from './utils/utils';
import './utils/handle-unhandled-rejection.utils';
import { ServerLoggerMessages } from './libs/enums/enums';

validateEnv();

const startServer = async () => {
    await validateDbConnection();

    const app = express();
    const port = 4000;

    app.use(requestLogger);

    app.use(express.json());

    app.use(router);

    app.use(notFoundHandler);

    app.use(errorHandler);

    const server = app.listen(port, () => {
        logger.info(`${ServerLoggerMessages.AppListening}${port}`);
    });

    statEmitter.on('newUser', () => {
        stats.totalUsers++;
    });
    statEmitter.on('newBet', () => {
        stats.totalBets++;
    });
    statEmitter.on('newEvent', () => {
        stats.totalEvents++;
    });

    gracefulShutdown(server);

    return server;
};

startServer().catch((err) => {
    logger.error(`${ServerLoggerMessages.FailedToStartServer} ${err}`);
    process.exit(1);
});