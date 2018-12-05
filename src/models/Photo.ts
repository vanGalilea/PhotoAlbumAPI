import * as ORM from 'sequelize';
import {SequelizeAttributes} from "../types";
import {IPageAttrs} from "./Page";

export interface IPhotoAttrs {
    id?: number
    url: string
    createdAt?: string
    updatedAt?: string,
    Page?: IPageAttrs
}

export type PhotoInstance = ORM.Instance<IPhotoAttrs> & IPhotoAttrs;

export default (sequelize: ORM.Sequelize) => {
    const attributes: SequelizeAttributes<IPhotoAttrs> = {
        id: {
            type: ORM.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: ORM.STRING
    };
    return sequelize.define<PhotoInstance, IPhotoAttrs>("Photo", attributes);
};


