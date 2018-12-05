import * as ORM from 'sequelize';
import {SequelizeAttributes} from "../types";
import {PageAttrs} from "./Page";

export interface PhotoAttrs {
    id?: number
    url: string
    createdAt?: string
    updatedAt?: string,
    Page?: PageAttrs
}

export type PhotoInstance = ORM.Instance<PhotoAttrs> & PhotoAttrs;

export default (sequelize: ORM.Sequelize) => {
    const attributes: SequelizeAttributes<PhotoAttrs> = {
        id: {
            type: ORM.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: ORM.STRING
    };
    return sequelize.define<PhotoInstance, PhotoAttrs>("Photo", attributes);
};


