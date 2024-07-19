import jwt from 'jsonwebtoken';

export const createToken = (id: string, type: string): string => {
    return jwt.sign({ id, type }, process.env.JWT_SECRET || 'default_secret');
};
