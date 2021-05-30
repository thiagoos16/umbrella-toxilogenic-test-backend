require('dotenv').config();
import * as http from 'http';
import Api from './config/api'
import { config } from './config/conf'

const server = http.createServer(Api);

server.listen(config.serverPort, () => console.log(`Server in running at port ${config.serverPort}`));
