import { Sequelize } from 'sequelize';
import { db } from '../../config/index';
import { initModels } from '../../models/index';

// const initDatabase = async () => {
//     try {
//         console.log('INITIALIZING DATABASE')
//         //uri = `postgres://${db.user}:${db.password}@${db.host}`;
//         const sequelize = new Sequelize(
//             db.database,
//             db.username,
//             db.password,
//             {
//                 host: db.host,
//                 dialect: 'postgres',
//                 logging: false,
//             }
//         );

//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//         initModels(sequelize);
//         await sequelize.sync(
//             { force: true }
//         );
//         console.log('All models were synchronized successfully.');
//     } catch (error) {
//         throw error
//     }
// }

class database {
    private sequelize: Sequelize | null = null;
    public isConnect: boolean = false;

    constructor() {
        this.isConnect = false;
    }

    public getInstance(): Sequelize {
        if (!this.sequelize) {
            this.sequelize = new Sequelize(db.database, db.username, db.password, {
                host: db.host,
                dialect: 'postgres',
                logging: false,
            });
            this.isConnect = true;
        }
        return this.sequelize;
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

export default database;
