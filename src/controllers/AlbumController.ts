import {HttpServer} from '../server/HttpServer';
import IController from "./IController";
import {Request, Response} from 'express';
import albumService from "../services/AlbumService";

export default class AlbumController implements IController {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/albums', this.list);
        httpServer.get('/album/:id', this.getById);
        httpServer.get('/album/:id/html', this.viewAlbum);
        httpServer.post('/album', this.create);
        httpServer.delete('/album/:id', this.remove);
    }

    private async list(req: Request, res: Response): Promise<void> {
        const album = await albumService.list();
        album ? res.send(album) : res.status(404).send('Not Found');
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const album = await albumService.getById(req.params.id);
        album ? res.send(album) : res.status(404).send('Not Found');
    }

    private async viewAlbum(req: Request, res: Response): Promise<void> {
        const album = await albumService.view(req.params.id, res);
        album ? res.render('index', { album }) : res.status(404).send('Not Found');
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const deletedAlbumId = await albumService.remove(req.params.id);
        deletedAlbumId > 0 ?
            res.status(200).send(`Removed album with id ${deletedAlbumId}`) :
            res.status(404).send('Not Found');
    }

    private async create(req: Request, res: Response): Promise<void> {
        const newAlbum = await albumService.create(req.body);
        res.json(newAlbum.toJSON());
    }
}