import * as ORM from 'sequelize';
import {SequelizeAttributes} from '../types';
import {IPageAttrs} from "./Page";

export interface IAlbumAttrs {
    id?: number
    title: string
    description: string
    createdAt?: string
    updatedAt?: string,
    Pages?: IPageAttrs[]
}

export type AlbumInstance = ORM.Instance<IAlbumAttrs> & IAlbumAttrs;

//this is where we define a new model
// we specify the model's attribute and the define it in our db
export default (sequelize: ORM.Sequelize) => {
    const attributes: SequelizeAttributes<IAlbumAttrs> = {
        id: {
            type: ORM.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: ORM.STRING,
        description: ORM.TEXT
    };
    return sequelize.define<AlbumInstance, IAlbumAttrs>("Album", attributes);
};

