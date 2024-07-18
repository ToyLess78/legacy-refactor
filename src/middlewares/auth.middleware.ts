import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../shared/utils/utils';
import { CustomRequest } from '../shared/interfaces/custom-request';

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        return next(AppError.unauthorized('Not Authorized'));
    }

    const token = authorizationHeader.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
        if (err) {
            return next(AppError.unauthorized('Not Authorized'));
        }

        req.user = decoded as JwtPayload & { id: string; type: string };
        next();
    });
};