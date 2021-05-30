import {Request, Response, ErrorRequestHandler, NextFunction } from 'express';

export function errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.error(`Api error Handler was executed ${err}`);
    res.status(500).send('internal.error');
}