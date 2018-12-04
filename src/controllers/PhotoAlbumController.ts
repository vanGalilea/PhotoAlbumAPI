import {HttpServer} from '../server/HttpServer';
import Controller from "./Controller";
import {Request, Response} from 'express';
import PhotoAlbumFactory, {PhotoAlbumAttrs, PhotoAlbumInstance} from "../models/PhotoAlbum";
import DatabaseProvider from "../db";
import {Sequelize} from "sequelize";

export default class PhotoAlbumController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/albums', this.list);
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

    private async getById(req: Request, res: Response): Promise<void> {
        const {PhotoAlbum} = DatabaseProvider.getModels();
        try {
            const pa = await PhotoAlbum.findByPk(req.params.id);
            pa ? res.send(pa) : res.sendStatus(404);
        } catch (e) {
            console.error(e)
        }
    }

    private async generatePdfById(req: Request, res: Response): Promise<void> {
        // console.log("generatePdfById fired with id ", req.params.id)
        const sequelize = DatabaseProvider.getConnection();
        const {PhotoAlbum} = DatabaseProvider.getModels();

        sequelize.sync()
            .then(() => PhotoAlbum.create({
                title: 'My Album new DX',
                description: 'some description new DX'
            }))
            .then(album => {
                res.json(album.toJSON());
            });
    }
}