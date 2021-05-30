import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';

import Routes from '../api/routes/routes.istance';

import { interceptor } from '../api/utils/interceptor';
import { errorHandlerApi } from '../api/utils/errorHandlerApi';

class Api {
    public express: Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    middleware(): void {
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(errorHandlerApi);
        this.express.use(interceptor);
        this.router(this.express);
    }

    private router(app: Application): void{
        new Routes(app);
    }
}

export default new Api().express;