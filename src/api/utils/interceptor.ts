import { NextFunction, Request, Response } from 'express';
import { config } from '../../config/conf';

export function interceptor(req: Request, res: Response, next: NextFunction) {

    res.setHeader('Access-Control-Allow-Origin', config.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token, Authorization');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');    

    next();
}