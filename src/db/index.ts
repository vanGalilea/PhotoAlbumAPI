import * as ORM from 'sequelize';
import { Options } from 'sequelize';
import MODELS from "../models";
import {PhotoAlbumAttrs, PhotoAlbumInstance} from "../models/PhotoAlbum";
import {PageAttrs, PageInstance} from "../models/Page";

type genericProjectModel = ORM.Model<PhotoAlbumInstance | PageInstance, PhotoAlbumAttrs | PageAttrs>;

interface modelsCollection {
    [key: string]: genericProjectModel
};

export default class DatabaseProvider {
    private static configuration: Options;
    private static connection: ORM.Sequelize
    private static models: any = {};

    public static configure(databaseConfiguration: Options): void {
        console.log("configure FIRED");
        DatabaseProvider.configuration = databaseConfiguration;
    }

    public static getConnection(): ORM.Sequelize {
        console.log("GETCONNECTIONS FIRED");
        if (DatabaseProvider.connection) return DatabaseProvider.connection;
        if (!DatabaseProvider.configuration) throw new Error('DatabaseProvider is not configured yet.');

        const sequelize = new ORM(DatabaseProvider.configuration);
        sequelize.authenticate()
            .then(()=> {
                console.log('Connection has been established successfully. Adding models');
                DatabaseProvider.addModels(sequelize);
                DatabaseProvider.associateModels();
                // DatabaseProvider.syncDB();
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
        const {PhotoAlbum, Page} = models;
        DatabaseProvider.models.Page.PhotoAlbum = Page.belongsTo(PhotoAlbum);
        DatabaseProvider.models.PhotoAlbum.Pages = PhotoAlbum.hasMany(Page);
    }
}