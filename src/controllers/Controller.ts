import {HttpServer} from '../server/httpServer';

export default interface Controller {
    initialize(httpServer: HttpServer): void;
}