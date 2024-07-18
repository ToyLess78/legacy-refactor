export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational: boolean = true, stack: string = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    static notFound(message: string = 'Not Found') {
        return new AppError(message, 404);
    }

    static internalServerError(message: string = 'Internal Server Error') {
        return new AppError(message, 500);
    }
}
