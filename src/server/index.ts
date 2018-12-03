import {HttpServer} from './httpServer';
import {RequestHandler} from 'express';
import CONTROLLERS from '../controllers';
import {Application} from "express";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";

export default class ApiServer implements HttpServer {
    private app: Application;

    public get(url: string, requestHandler: RequestHandler): void {
        this.addRoute('get', url, requestHandler);
    }
    //
    // public post(url: string, requestHandler: RequestHandler): void {
    //     this.addRoute('post', url, requestHandler);
    // }
    //
    // public delete(url: string, requestHandler: RequestHandler): void {
    //     this.addRoute('delete', url, requestHandler);
    // }
    //
    // public put(url: string, requestHandler: RequestHandler): void {
    //     this.addRoute('put', url, requestHandler);
    // }
    //
    private addRoute(method: 'get' | 'post' | 'put' | 'delete', url: string, requestHandler: RequestHandler): void {
        this.app[method](url, async (req, res, next) => {
            try {
                await requestHandler(req, res, next);
            }
            catch (e) {
                console.log(e);
                return next(e);
            }
        });
        console.log(`Added route ${method.toUpperCase()} ${url}`);
    }

    public start(port: number): void {
        this.app = express();

        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        this.addControllers();

        this.app.listen(port, (err: any) => {
            if (err) return err;
            console.log('Server is up and running on port ' + port);
        });
    }

    private addControllers(): void {
        CONTROLLERS.forEach(controller => controller.initialize(this));
    }
}