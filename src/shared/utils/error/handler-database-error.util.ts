import { AppError } from '../utils';

export const handleDatabaseError = (error: unknown): never => {
    if (error instanceof Error && 'code' in error && 'detail' in error) {
        const dbError = error as { code: string, detail: string };
        if (dbError.code === '23505') {
            throw AppError.badRequest(dbError.detail);
        }
    }
    throw AppError.internalServerError();
};

export const withErrorHandling = <T>(fn: () => Promise<T>): Promise<T> => {
    return fn().catch(handleDatabaseError);
};
