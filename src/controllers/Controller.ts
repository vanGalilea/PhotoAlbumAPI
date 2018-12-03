import {HttpServer} from '../server/HttpServer';

export default interface Controller {
    initialize(httpServer: HttpServer): void;
}