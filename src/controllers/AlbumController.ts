import {HttpServer} from '../server/HttpServer';
import IController from "./IController";
import {Request, Response} from 'express';
import DatabaseProvider from "../db";
import albumService from "../services/AlbumService";

export default class AlbumController implements IController {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/albums', this.list);
        httpServer.get('/album/:id', this.getById);
        httpServer.get('/album/:id/pdf', this.generatePdfById);
        httpServer.post('/', this.create);
    }

    private async list(req: Request, res: Response): Promise<void> {
        const album = await albumService.list();
        album ? res.send(album) : res.status(404).send('Not Found');
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const album = await albumService.getById(req.params.id);
        album ? res.send(album) : res.status(404).send('Not Found');
    }

    private async generatePdfById(req: Request, res: Response): Promise<void> {
        const album = await albumService.generatePDF(req.params.id);
        album ? res.send(album) : res.status(404).send('Not Found');
    }

    private async create(req: Request, res: Response): Promise<void> {
        const sequelize = DatabaseProvider.getConnection();
        const {Album, Page} = DatabaseProvider.getModels();

        sequelize.sync()
            .then(() => Album.create(
                {
                    title: "Gerri album",
                    description: "The greatest journalist",
                    Pages: [
                        {
                            photosCount: 23,
                            Photos: [
                                {url: "https://cdn-kiosk-api.telegraaf.nl/75740900-deb8-11e7-96da-81a0dd833b3d.jpg"},
                                {url: "https://d1ielco78gv5pf.cloudfront.net/assets/clear-495a83e08fc8e5d7569efe6339a1228ee08292fa1f2bee8e0be6532990cb3852.gif"}
                            ]
                        },
                        {
                            photosCount: 22,
                            Photos: [
                                {url: "https://cdn-kiosk-api.telegraaf.nl/75740900-deb8-11e7-96da-81a0dd833b3d.jpg"},
                                {url: "https://pbs.twimg.com/media/C9T88EHXsAAMKxn.jpg"}
                            ]

                        },
                        {
                            photosCount: 15,
                            Photos: [
                                {url: "https://pbs.twimg.com/media/C9T88EHXsAAMKxn.jpg"}
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