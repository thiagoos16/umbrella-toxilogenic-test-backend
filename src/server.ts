require('dotenv').config();
import * as http from 'http';
import Api from './config/api'
import { config } from './config/conf'
import mongoose from 'mongoose';

const server = http.createServer(Api);

mongoose.connect(
    config.dbURL + config.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

server.listen(config.serverPort, () => console.log(`Server in running at port ${config.serverPort}`));
