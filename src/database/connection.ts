import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    "menu_proyecto",
    "dev_proyecto",
    "anashe", {
        host: "54.233.144.140",
        dialect: 'postgres'
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})

export default sequelize;