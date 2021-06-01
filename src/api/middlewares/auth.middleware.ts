import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/conf';
import * as status from 'http-status';

export class auth {
    static verifyJWT(req:Request, res:Response, next:NextFunction) {
        const authHeader = req.headers.authorization;
    
        if (!authHeader)
            return res.status(status.UNAUTHORIZED).send({error: 'No token porvided' });
    
        const parts:string[] = authHeader.split(' ');
    
        const [ scheme, token ] = parts;
    
        if (parts.length != 2)
            return res.status(status.UNAUTHORIZED).send({ error: 'Token error'});
    
        if (!/^Bearer$/i.test(scheme))
            return res.status(status.UNAUTHORIZED).send({ error: 'Token malformated'}); 
    
        jwt.verify(token, config.secret, (err:any, decoded:any) => {
            if (err) return res.status(status.UNAUTHORIZED).send({ error: 'token invalid' });
            
            req.userId = decoded.params.id;
            console.log(req.userId);
            return next();
        });
    }
}