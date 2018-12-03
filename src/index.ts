import * as dotenv from 'dotenv';
import ApiServer from './server';

dotenv.config();

const server = new ApiServer();
server.start(+process.env.PORT || 8080);