import * as ORM from 'sequelize';
import { Options } from 'sequelize';

export default class DatabaseProvider {
    private static configuration: Options;
    private static connection: ORM.Sequelize;

    public static configure(databaseConfiguration: Options): void {
        DatabaseProvider.configuration = databaseConfiguration;
    }

    public static getConnection(): ORM.Sequelize {
        if (DatabaseProvider.connection) return DatabaseProvider.connection;
        if (!DatabaseProvider.configuration) throw new Error('DatabaseProvider is not configured yet.');

        const sequelize = new ORM(DatabaseProvider.configuration);
        sequelize.authenticate()
            .then(()=> console.log('Connection has been established successfully.'))
            .catch((e)=> console.error('Unable to connect to the database:', e));

        return DatabaseProvider.connection = sequelize;
    }
}