import { Application, Request, Response } from 'express';
import { auth } from '../middlewares/auth.middleware';
import { AuthController } from '../controllers/auth.control';

export class AuthRoutes {
    private controller: AuthController;

    private verifyToken = auth.verifyJWT;

    constructor(app: Application) {
        this.controller = new AuthController();
        this.getRoutes(app);
    }

    getRoutes(app: Application): void {
        app.route('/register').post((req: Request, res: Response) => {
            this.controller.register(req, res)    
        });

        app.route('/login').post((req: Request, res: Response) => {
            this.controller.login(req, res)    
        });

        app.route('/profile').get(this.verifyToken, (req: Request, res: Response) => {
            this.controller.profile(req, res)    
        });
    }
}