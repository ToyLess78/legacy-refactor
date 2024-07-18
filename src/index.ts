import express from 'express';
import { errorHandler, notFoundHandler, requestLogger } from './middlewares/middelewares';
import router from './router/router';
import { statEmitter, stats } from './events/stats-emitter.events';
import { logger, validateDbConnection, gracefulShutdown, validateEnv  } from './shared/utils/utils';
import './shared/utils/handle-unhandled-rejection.utils';
import { ServerLoggerMessages } from './shared/enums/enums';
import jwt from 'jsonwebtoken';

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
    const token = jwt.sign({ id: "c486ab55-5c4b-4689-8f57-ace155ea65b4" }, "testing12345");

    console.log('token', token)

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