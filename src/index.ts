import * as dotenv from 'dotenv';
import ApiServer from './server';
import DatabaseProvider from "./db";
import * as ORM from "sequelize";

dotenv.config();

DatabaseProvider.configure({
    database: process.env.DATABASE_NAME || 'test',
    username: process.env.DATABASE_USERNAME || 'test',
    password: process.env.DATABASE_PASSWORD || 'test',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: process.env.DATABASE_DIALECT || 'postgres'
});

const server = new ApiServer();
server.start(+process.env.PORT || 8080);