import {HttpServer} from '../server/HttpServer';
import Controller from "./Controller";
import {Request, Response} from 'express';
import DatabaseProvider from "../db";

export default class PhotoAlbumController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/albums', this.list);
        httpServer.get('/album/:id', this.getById);
        httpServer.get('/album/:id/pdf', this.generatePdfById);
    }

    private async list(req: Request, res: Response): Promise<void> {
        const {PhotoAlbum, Page} = DatabaseProvider.getModels();
        try {
            const paList = await PhotoAlbum.findAll({
                include: [{
                    association: PhotoAlbum.Pages,
                    include: Page.Photos
                }]
            });
            paList ? res.send(paList) : res.sendStatus(404);
        } catch (e) {
            console.error(e)
        }
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const {PhotoAlbum, Page} = DatabaseProvider.getModels();
        try {
            const pa = await PhotoAlbum.findByPk(req.params.id, {
                include: [{
                    association: PhotoAlbum.Pages,
                    include: Page.Photos
                }]
            });
            console.log(pa);
            pa ? res.send(pa) : res.sendStatus(404);
        } catch (e) {
            console.error(e)
        }
    }

    private async generatePdfById(req: Request, res: Response): Promise<void> {
        const sequelize = DatabaseProvider.getConnection();
        const {PhotoAlbum, Page} = DatabaseProvider.getModels();

        sequelize.sync()
            .then(() => PhotoAlbum.create(
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
                        association: PhotoAlbum.Pages,
                        include: Page.Photos
                    }]
                }
            ))
            .then(album => {
                res.json(album.toJSON());
            });
    }
}