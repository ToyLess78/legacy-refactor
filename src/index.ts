import express from 'express';
import { errorHandlerMw, notFoundHandlerMw, reqLoggerMw } from './middlewares/middelewares';
import router from './router/router';
import { statEmitter, stats } from './events/stats-emitter.events';
import { gracefulShutdown, logger, validateDbConnection, validateEnv } from './shared/utils/utils';
import './shared/utils/error/handle-unhandled-rejection.utils';
import { SrvLoggerMsg } from './shared/enums/enums';
import jwt from 'jsonwebtoken';

validateEnv();

const app = express();
const port = 4000;

app.use(reqLoggerMw);
app.use(express.json());
app.use(router);
app.use(notFoundHandlerMw);
app.use(errorHandlerMw);

const token = jwt.sign({
    type: "client",
    id: "0f290598-1b54-4a36-8c58-33caa7d08b5f"
}, "testing12345");
console.log('token', token);

validateDbConnection().catch((err) => {
    logger.error(`${SrvLoggerMsg.FailedToStartServer} ${err}`);
    process.exit(1);
});

const server = app.listen(port, () => {
    logger.info(`${SrvLoggerMsg.AppListening}${port}`);

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
});

module.exports = {app, server};


