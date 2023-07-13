import { Sequelize } from 'sequelize';
import { db } from '../../config/index';
import { initModels } from '../../models/index';

class Database {
    private static instance: Database | null = null;
    private sequelize: Sequelize | null = null;
    public isConnect: boolean = false;

    private constructor() {
        this.isConnect = false;
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async initDatabase() {
        try {
            this.sequelize = new Sequelize(db.database, db.username, db.password, {
                host: db.host,
                dialect: 'postgres',
                logging: false,
            });
            console.log('INITIALIZING DATABASE');
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
            initModels(this.sequelize);
            await this.sequelize.sync({ force: false });
            console.log('All models were synchronized successfully.');
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    }
}

export default Database;
