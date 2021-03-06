import * as ORM from 'sequelize';
import {IncludeAssociation, Options} from 'sequelize';
import MODELS from "../models";
import {genericAttrs, modelInstance} from "../types";

interface IModelAssociation {
    [key: string]: IncludeAssociation
};

export type genericProjectModel = ORM.Model<modelInstance, genericAttrs> & IModelAssociation;

interface IModelsCollection {
    [key: string]: genericProjectModel
};

export default class DatabaseProvider {
    private static configuration: Options;
    private static connection: ORM.Sequelize;
    private static models: IModelsCollection = {};

    public static configure(databaseConfiguration: Options): void {
        DatabaseProvider.configuration = databaseConfiguration;
    }

    //here we configure and initialize the ORM which is SequelizeJS
    public static getConnection(): ORM.Sequelize {
        if (DatabaseProvider.connection) return DatabaseProvider.connection;
        if (!DatabaseProvider.configuration) throw new Error('DatabaseProvider is not configured yet.');

        const sequelize = new ORM(DatabaseProvider.configuration);
        sequelize.authenticate()
            .then(()=> {
                console.log('Connection has been established successfully. Adding models');
                DatabaseProvider.addModels(sequelize);
                DatabaseProvider.associateModels();
            })
            .catch((e)=> console.error('Unable to connect to the database:', e));
        return DatabaseProvider.connection = sequelize;
    }

    private static addModels(sequelize: ORM.Sequelize): void {
         Object.keys(MODELS).forEach((key: string) => DatabaseProvider.models[key] = MODELS[key](sequelize));
    }

    public static getModels(): IModelsCollection {
        return DatabaseProvider.models;
    }

    //associate your models here
    private static associateModels(): void {
        const {models} = DatabaseProvider;
        const {Album, Page, Photo} = models;
        DatabaseProvider.models.Album.Pages = Album.hasMany(Page);
        DatabaseProvider.models.Page.Album = Page.belongsTo(Album);
        DatabaseProvider.models.Page.Photos = Page.hasMany(Photo);
        DatabaseProvider.models.Photo.Page = Photo.belongsTo(Page);
    }
}