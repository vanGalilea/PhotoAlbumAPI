import * as dotenv from 'dotenv';

dotenv.config();

export default ()=> {
    dotenv.config();
    return {
        database: process.env.DATABASE_NAME || 'test',
        username: process.env.DATABASE_USERNAME || 'test',
        password: process.env.DATABASE_PASSWORD || 'test',
        host: process.env.DATABASE_HOST || 'localhost',
        dialect: process.env.DATABASE_DIALECT || 'postgres',
        port: +process.env.DATABASE_PORT || 5423
    }
};