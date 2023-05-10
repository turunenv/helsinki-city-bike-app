import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWORD;

console.log(DB_USER, DB_PASSWD);

const sequelize = new Sequelize('bikejourneydb', DB_USER, DB_PASSWD, {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  await sequelize.authenticate();
  console.log('connection has been established successfully');
} catch (error) {
  console.log('unable to connect to the database', error);
}
