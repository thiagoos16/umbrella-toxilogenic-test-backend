import { PathParams } from 'express-serve-static-core';
import { Application, Request, Response } from 'express';

import { AuthRoutes } from '../routes/auth.route';

class Routes {
    constructor(app: Application) {
        new AuthRoutes(app);
    }
}

export default Routes;