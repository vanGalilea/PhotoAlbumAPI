import * as ORM from 'sequelize';
import { Sequelize, Options } from 'sequelize';

export default class DatabaseProvider {
    private static configuration: Options;
    private static connection: Sequelize;

    public static configure(databaseConfiguration: Options): void {
        DatabaseProvider.configuration = databaseConfiguration;
    }

    public static async getConnection(): Promise<Sequelize> {
        if (DatabaseProvider.connection) return DatabaseProvider.connection;
        if (!DatabaseProvider.configuration) throw new Error('DatabaseProvider is not configured yet.');

        const sequelize = new ORM(DatabaseProvider.configuration);
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (e) {
            console.error('Unable to connect to the database:', e);
        }

        return sequelize;
    }
}