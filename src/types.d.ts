import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";
import {IAlbumAttrs} from "./models/Album";
import {IPageAttrs} from "./models/Page";
import {IPhotoAttrs} from "./models/Photo";
import * as ORM from "sequelize";

export type genericAttrs = IAlbumAttrs | IPageAttrs| IPhotoAttrs;
export type modelInstance = ORM.Instance<genericAttrs> & genericAttrs;

export type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
};
