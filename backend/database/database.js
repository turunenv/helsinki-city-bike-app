import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWORD;
const HOST = process.env.HOST || 'localhost';

const db_config = {
  host: HOST,
  dialect: 'mysql',
};

let database = 'bikejourneydb';

if (process.env.NODE_ENV === 'TEST') {
  db_config.logging = false;
  database = 'test_db';
}

const sequelize = new Sequelize(database, DB_USER, DB_PASSWD, db_config);

export default sequelize;
