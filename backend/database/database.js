import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWORD;

const sequelize = new Sequelize('bikejourneydb', DB_USER, DB_PASSWD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: process.env.NODE_ENV !== 'TEST', 
});

export default sequelize;
