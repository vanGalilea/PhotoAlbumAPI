import {HttpServer} from '../server/HttpServer';
import Controller from "./Controller";
import {Request, Response} from 'express';

export default class PhotoAlbumController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/albums', this.list);
        httpServer.get('/album/:id', this.getById);
        httpServer.get('/album/:id/pdf', this.generatePdfById);
        // httpServer.post('/album', this.create.bind(this));
        // httpServer.put('/album/:id', this.update.bind(this));
        // httpServer.delete('/album/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        console.log("list fired")
        // res.send(await albumService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        console.log("getById fired with id ", req.params.id)
        // const album = await albumService.getById(req.params.id);
        // res.send(album ? 200 : 404, album);
    }

    private async generatePdfById(req: Request, res: Response): Promise<void> {
        console.log("generatePdfById fired with id ", req.params.id)
    }

    // private async create(req: Request, res: Response): Promise<void> {
    //     res.send(await albumService.create(req.body));
    // }
    //
    // private async update(req: Request, res: Response): Promise<void> {
    //     res.send(await albumService.update({...req.body, id: req.params.id}));
    // }
    //
    // private async remove(req: Request, res: Response): Promise<void> {
    //     try {
    //         await albumService.delete(req.params.id);
    //         res.send(200);
    //     }
    //     catch (e) {
    //         res.send(500);
    //     }
    // }
}