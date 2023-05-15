import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWORD;

const db_config = {
  host: 'localhost',
  dialect: 'mysql',
};

//sequelize db config object's 'logging'-option can only be false or a function
if (process.env.NODE_ENV === 'TEST') {
  db_config.logging = false;
}

const sequelize = new Sequelize('bikejourneydb', DB_USER, DB_PASSWD, db_config);

export default sequelize;
