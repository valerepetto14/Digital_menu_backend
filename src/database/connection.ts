import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
  logging: false // set to true to log SQL queries
});

export default sequelize;