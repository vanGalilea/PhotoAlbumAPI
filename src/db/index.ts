import * as ORM from 'sequelize';
import {IncludeAssociation, IncludeOptions, Model, Options} from 'sequelize';
import MODELS from "../models";
import {PhotoAlbumAttrs} from "../models/PhotoAlbum";
import {PageAttrs} from "../models/Page";
import {PhotoAttrs} from "../models/Photo";

interface modelAssociation {
    [key: string]: IncludeAssociation | any
};

type genericAttrs = PhotoAlbumAttrs | PageAttrs| PhotoAttrs;
type modelInstance = ORM.Instance<genericAttrs> & genericAttrs;
type genericProjectModel = ORM.Model<modelInstance, genericAttrs> & modelAssociation;

interface modelsCollection {
    [key: string]: genericProjectModel
};

export default class DatabaseProvider {
    private static configuration: Options;
    private static connection: ORM.Sequelize;
    private static models: modelsCollection = {};

    public static configure(databaseConfiguration: Options): void {
        DatabaseProvider.configuration = databaseConfiguration;
    }

    public static getConnection(): ORM.Sequelize {
        if (DatabaseProvider.connection) return DatabaseProvider.connection;
        if (!DatabaseProvider.configuration) throw new Error('DatabaseProvider is not configured yet.');

        const sequelize = new ORM(DatabaseProvider.configuration);
        sequelize.authenticate()
            .then(()=> {
                console.log('Connection has been established successfully. Adding models');
                DatabaseProvider.addModels(sequelize);
                DatabaseProvider.associateModels();
                DatabaseProvider.syncDB();
            })
            .catch((e)=> console.error('Unable to connect to the database:', e));
        return DatabaseProvider.connection = sequelize;
    }

    private static addModels(sequelize: ORM.Sequelize): void {
         Object.keys(MODELS).forEach((key: string) => DatabaseProvider.models[key] = MODELS[key](sequelize));
    }

    public static getModels(): modelsCollection {
        return DatabaseProvider.models;
    }

    private static syncDB(): void {
        const {models} = DatabaseProvider;
        Object.values(models).forEach((model: genericProjectModel)=> model.sync({force: true}));
    }

    private static associateModels(): void {
        const {models} = DatabaseProvider;
        const {PhotoAlbum, Page, Photo} = models;
        DatabaseProvider.models.PhotoAlbum.Pages = PhotoAlbum.hasMany(Page);
        DatabaseProvider.models.Page.PhotoAlbum = Page.belongsTo(PhotoAlbum);
        DatabaseProvider.models.Page.Photos = Page.hasMany(Photo);
        DatabaseProvider.models.Photo.Page = Photo.belongsTo(Page);
    }
}