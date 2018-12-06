import {modelInstance} from "../types";
import dbProvider from "../db";
import {Response} from 'express';

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


    public async viewAlbum(albumId: number, res: Response): Promise<modelInstance> {
        return await this.getById(albumId);
    }

    //add here you rest CRUD implementations => create, delete, update
}

export default new AlbumService();