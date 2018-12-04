import * as ORM from 'sequelize';
import { Options } from 'sequelize';
import MODELS from "../models";
import {PhotoAlbumAttrs, PhotoAlbumInstance} from "../models/PhotoAlbum";

interface modelsCollection {
    [key: string]: ORM.Model<PhotoAlbumInstance, PhotoAlbumAttrs>
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
            })
            .catch((e)=> console.error('Unable to connect to the database:', e));
        return DatabaseProvider.connection = sequelize;
    }

    private static addModels(sequelize: ORM.Sequelize): void {
         Object.keys(MODELS).map(key=> DatabaseProvider.models[key] = MODELS[key](sequelize));
    }

    public static getModels(): modelsCollection {
        return DatabaseProvider.models;
    }

}