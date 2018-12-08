import {RequestHandler} from 'express';

export interface HttpServer {
    get(url: string, requestHandler: RequestHandler): void;

    post(url: string, requestHandler: RequestHandler): void;

    delete(url: string, requestHandler: RequestHandler): void;

    put(url: string, requestHandler: RequestHandler): void;
}