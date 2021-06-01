import { Request, Response } from 'express';
import User from '../models/user.model';
import { omit } from "lodash";
import bcrypt from 'bcryptjs';
import { Utils } from '../utils/utils';
import * as status from 'http-status';
import { uuid } from 'uuidv4';
import { IUserResponse, IUser } from '../interfaces/user.interface';

export class AuthController {
    async register(req: Request, res: Response) {
        const user:IUser = new User(req.body);

        await user.save((err, user) => {
            if (err) 
                return res.status(status.BAD_REQUEST).send({ error: err }); 
            
            const token = Utils.generateToken({ id: user.id });

            const user_response = omit(user.toJSON(), ["password", "_id", "__v"]);

            return res.send({ user: user_response, token })
        });
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) 
            return res.status(status.NOT_FOUND).send({ error: 'user.not.found'});

        if (!await bcrypt.compare(password, user.password))
            return res.status(status.BAD_REQUEST).send({ error: 'invalid.password'});
        
        const token = Utils.generateToken({ id: user.id });

        const user_response = omit(user.toJSON(), ["password", "_id", "__v"]);

        res.status(status.OK).send( { user:user_response, token } );
    }

    async profile(req: Request, res: Response) {
        const userId = req.userId;

        const user = await User.findById(userId);
        
        if (!user)
            return res.status(status.NOT_FOUND).send({ error: 'user.not.found' });

        res.status(status.OK).send({ user });
    }
}
