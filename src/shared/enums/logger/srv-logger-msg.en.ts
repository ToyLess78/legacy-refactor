export enum SrvLoggerMsg {
    AppListening = 'App listening at http://localhost:',
    ReceivedKillSignal = 'Received kill signal, shutting down gracefully',
    ClosedRemainingConnections = 'Closed out remaining connections',
    ForcefullyShuttingDown = 'Could not close connections in time, forcefully shutting down',
    FailedToStartServer = 'Failed to start server:'
}
