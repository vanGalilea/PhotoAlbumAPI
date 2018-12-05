import * as ORM from 'sequelize';
import {SequelizeAttributes} from '../types';
import {IAlbumAttrs} from "./Album";
import {IPhotoAttrs} from "./Photo";

export interface IPageAttrs {
    id?: number,
    photosCount?: number,
    createdAt?: string
    updatedAt?: string
    Album?: IAlbumAttrs
    Photos?: IPhotoAttrs[]
}

export type PageInstance = ORM.Instance<IPageAttrs> & IPageAttrs;

export default (sequelize: ORM.Sequelize) => {
    const attributes: SequelizeAttributes<IPageAttrs> = {
        id: {
            type: ORM.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        photosCount: ORM.INTEGER
    };
    return sequelize.define<PageInstance, IPageAttrs>("Page", attributes);
};

