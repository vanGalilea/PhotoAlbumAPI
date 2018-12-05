import ApiServer from './server';
import DatabaseProvider from "./db";
import getConfiguration from "./db/configuration";


DatabaseProvider.configure(getConfiguration());
DatabaseProvider.getConnection();

const server = new ApiServer();
server.start(+process.env.PORT || 8080);