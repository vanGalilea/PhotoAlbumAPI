import {HttpServer} from '../server/HttpServer';
import Controller from "./Controller";
import {Request, Response} from 'express';
import DatabaseProvider from "../db";

export default class PhotoAlbumController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/albums', this.list);
        httpServer.get('/pages', this.listP);
        httpServer.get('/album/:id', this.getById);
        httpServer.get('/album/:id/pdf', this.generatePdfById);
    }

    private async list(req: Request, res: Response): Promise<void> {
        const {PhotoAlbum} = DatabaseProvider.getModels();
        try {
            const paList = await PhotoAlbum.findAll();
            res.send(paList);
        } catch (e) {
            console.error(e)
        }
    }

    private async listP(req: Request, res: Response): Promise<void> {
        const {Page} = DatabaseProvider.getModels();
        try {
            const paList = await Page.findAll();
            res.send(paList);
        } catch (e) {
            console.error(e)
        }
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const {PhotoAlbum, Page} = DatabaseProvider.getModels();
        try {
            const pa = await PhotoAlbum.findByPk(req.params.id, {include: [Page]});
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
                    title: "some with pages 22",
                    description: "some desc...",
                    Pages: [
                        {photosCount: 23},
                        {photosCount: 22},
                        {photosCount: 15},
                    ]
                },
                {
                    include: [Page]
                }
            ))
            .then(album => {
                res.json(album.toJSON());
            });
    }
}