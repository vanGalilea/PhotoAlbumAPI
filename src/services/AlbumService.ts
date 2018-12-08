import {genericAttrs, modelInstance} from "../types";
import dbProvider, {genericProjectModel} from "../db";
import {Response} from 'express';
import * as ORM from 'sequelize';
import {IAlbumAttrs} from "../models/Album";

//add here you rest CRUD operations implementations of a model

class AlbumService {
    public async list(): Promise<modelInstance[]> {
        const {Album, Page} = dbProvider.getModels();
        try {
            return await Album.findAll({
                include: [{
                    association: Album.Pages,
                    include: Page.Photos
                }] as any
            });
        } catch (e) {
            console.error(e)
        }
    }

    public async getById(albumId: number): Promise<modelInstance> {
        const {Album, Page} = dbProvider.getModels();
        try {
            return await Album.findByPk(albumId, {
                include: [{
                    association: Album.Pages,
                    include: Page.Photos
                }] as any
            });
        } catch (e) {
            console.error(e)
        }
    }


    public async remove(albumId: number): Promise<number> {
        const {Album} = dbProvider.getModels();
        return await Album.destroy({where: {id: albumId}})
    }

    public async create(album: IAlbumAttrs): Promise<ORM.Instance<genericAttrs>> {
        const {Album, Page} = dbProvider.getModels();
        const sequelize = dbProvider.getConnection();
        const {title, description, Pages} = album;
        return sequelize.sync()
            .then(() => Album.create(
                {title, description, Pages},
                {
                    include: [{
                        association: Album.Pages,
                        include: Page.Photos
                    }] as any
                }
            ))
    }

    public async view(albumId: number, res: Response): Promise<modelInstance> {
        return await this.getById(albumId);
    }
}

export default new AlbumService();