import {HttpServer} from '../server/HttpServer';
import Controller from "./Controller";
import {Request, Response} from 'express';

export default class PhotoAlbumController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/albums', this.list);
        httpServer.get('/album/:id', this.getById);
        httpServer.get('/album/:id/pdf', this.generatePdfById);
    }

    private async list(req: Request, res: Response): Promise<void> {
        console.log("list fired")
    }

    private async getById(req: Request, res: Response): Promise<void> {
        console.log("getById fired with id ", req.params.id)
    }

    private async generatePdfById(req: Request, res: Response): Promise<void> {
        console.log("generatePdfById fired with id ", req.params.id)
    }
}