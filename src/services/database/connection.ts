import { Sequelize } from 'sequelize'; 
import { db } from '../../config/index';
import { initModels } from '../../models/index';

const initDatabase = async () => {
    try {
        console.log('INITIALIZING DATABASE')
        //uri = `postgres://${db.user}:${db.password}@${db.host}`;  
        const sequelize = new Sequelize(
            db.database,
            db.username,
            db.password,
            {
                host: db.host,
                dialect: 'postgres',
                logging: false,
            }

        );

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        initModels(sequelize);
        await sequelize.sync(
            { force: true }
        );
        console.log('All models were synchronized successfully.');
    } catch (error) {
        throw error
    }
}

export default initDatabase;