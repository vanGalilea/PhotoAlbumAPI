import {HttpServer} from '../server/HttpServer';
import Controller from "./Controller";
import {Request, Response} from 'express';
import PhotoAlbumFactory from "../models/PhotoAlbum";
import DatabaseProvider from "../db";

export default class PhotoAlbumController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/albums', this.list);
        httpServer.get('/album/:id', this.getById);
        httpServer.get('/album/:id/pdf', this.generatePdfById);
    }

    private async list(req: Request, res: Response): Promise<void> {
        const sequelize = DatabaseProvider.getConnection();
        const photoAlbum = PhotoAlbumFactory(sequelize);
        try {
            const paList = await photoAlbum.findAll();
            res.send(paList);
        } catch (e) {
            console.error(e)
        }
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const sequelize = DatabaseProvider.getConnection();
        const photoAlbum = PhotoAlbumFactory(sequelize);
        try {
            const pa = await photoAlbum.findByPk(req.params.id);
            pa ? res.send(pa) : res.sendStatus(404);
        } catch (e) {
            console.error(e)
        }
    }

    private async generatePdfById(req: Request, res: Response): Promise<void> {
        // console.log("generatePdfById fired with id ", req.params.id)
        const sequelize = DatabaseProvider.getConnection();
        const photoAlbum = PhotoAlbumFactory(sequelize);
        sequelize.sync()
            .then(() => photoAlbum.create({
                title: 'My Album new',
                description: 'some description new'
            }))
            .then(album => {
                res.json(album.toJSON());
            });
    }
}