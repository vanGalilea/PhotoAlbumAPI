import * as ORM from 'sequelize';
import {SequelizeAttributes} from '../types';
import {PageAttrs} from "./Page";

export interface PhotoAlbumAttrs {
    id?: number
    title: string
    description: string
    createdAt?: string
    updatedAt?: string,
    Pages?: PageAttrs[]
}

export type PhotoAlbumInstance = ORM.Instance<PhotoAlbumAttrs> & PhotoAlbumAttrs;

export default (sequelize: ORM.Sequelize) => {
    const attributes: SequelizeAttributes<PhotoAlbumAttrs> = {
        id: {
            type: ORM.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: ORM.STRING,
        description: ORM.TEXT
    };
    return sequelize.define<PhotoAlbumInstance, PhotoAlbumAttrs>("PhotoAlbum", attributes);
};

