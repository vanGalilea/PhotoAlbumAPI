import * as ORM from 'sequelize';
import {SequelizeAttributes} from '../types';
import {PhotoAlbumAttrs} from "./PhotoAlbum";
import {PhotoAttrs} from "./Photo";

export interface PageAttrs {
    id?: number,
    photosCount?: number,
    createdAt?: string
    updatedAt?: string
    PhotoAlbum?: PhotoAlbumAttrs
    Photos?: PhotoAttrs[]
}

export type PageInstance = ORM.Instance<PageAttrs> & PageAttrs;

export default (sequelize: ORM.Sequelize) => {
    const attributes: SequelizeAttributes<PageAttrs> = {
        id: {
            type: ORM.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        photosCount: ORM.INTEGER
    };
    return sequelize.define<PageInstance, PageAttrs>("Page", attributes);
};

