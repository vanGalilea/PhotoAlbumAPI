import {modelInstance} from "../types";
import dbProvider from "../db";

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


    public async generatePDF(albumId: number): Promise<any> {
        const album = await this.getById(albumId);
        console.log(album)
    }

    // public async create(albumId: number, song: Song): Promise<Song> {
    //     const connection = await DatabaseProvider.getConnection();
    //
    //     // Normally DTO !== DB-Entity, so we "simulate" a mapping of both
    //     const newSong = new Song();
    //     newSong.title = song.title;
    //     newSong.duration = song.duration;
    //
    //     const album = await connection.getRepository(Album).findOne(albumId);
    //
    //     if (!album) {
    //         return;
    //     }
    //
    //     newSong.album = album;
    //
    //     return await connection.getRepository(Song).save(newSong);
    // }
    //
    // public async delete(id: number): Promise<Song> {
    //     const connection = await DatabaseProvider.getConnection();
    //     const repository = connection.getRepository(Song);
    //     const entity = await repository.findOne(id);
    //     return await repository.remove(entity)
    // }
}

export default new AlbumService();