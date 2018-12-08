import {HttpServer} from '../server/HttpServer';
import IController from "./IController";
import {Request, Response} from 'express';
import DatabaseProvider from "../db";
import albumService from "../services/AlbumService";

export default class AlbumController implements IController {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/albums', this.list);
        httpServer.get('/album/:id', this.getById);
        httpServer.get('/album/:id/html', this.viewAlbum);
        httpServer.post('/create', this.create);
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
        res.status(200).send(`Removed album with id ${deletedAlbumId}`);
    }

    private async create(req: Request, res: Response): Promise<void> {
        const sequelize = DatabaseProvider.getConnection();
        const {Album, Page} = DatabaseProvider.getModels();

        sequelize.sync()
            .then(() => Album.create(
                {
                    title: "My album I",
                    description: "This album is about animals",
                    Pages: [
                        {
                            photosCount: 2,
                            Photos: [
                                {url: "https://cdn-kiosk-api.telegraaf.nl/75740900-deb8-11e7-96da-81a0dd833b3d.jpg"},
                                {url: "http://roflzoo.com/pics/201409/tn_bunny-is-not-impressed.jpg"}
                            ]
                        },
                        {
                            photosCount: 2,
                            Photos: [
                                {url: "https://image.shutterstock.com/image-photo/colorful-photograph-isolated-alpaca-wild-450w-280228817.jpg"},
                                {url: "https://img.izismile.com/img/img4/20110923/640/these_funny_animals_800_640_01.jpg"}
                            ]

                        },
                        {
                            photosCount: 1,
                            Photos: [
                                {url: "http://roflzoo.com/pics/042010/cute-little-bunny-tn.jpg"}
                            ]
                        },
                    ]
                },
                {
                    include: [{
                        association: Album.Pages,
                        include: Page.Photos
                    }] as any
                }
            ))
            .then(album => {
                res.json(album.toJSON());
            });
    }
}