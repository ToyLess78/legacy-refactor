import { Request, Response } from 'express';

export const healthCtrl = (req: Request, res: Response) => {
    res.send('Hello World!');
};
