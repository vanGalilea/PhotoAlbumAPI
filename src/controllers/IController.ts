import {HttpServer} from '../server/HttpServer';

export default interface IController {
    initialize(httpServer: HttpServer): void;
}