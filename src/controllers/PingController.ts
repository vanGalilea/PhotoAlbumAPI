import {HttpServer} from '../server/HttpServer';
import IController from "./IController";

export default class PingController implements IController {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/ping', (req, res) => res.send('ping 💪'));
    }
}