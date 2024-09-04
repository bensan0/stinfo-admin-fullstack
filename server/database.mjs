import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import config from './config/index.mjs';

const result = dotenv.config({path: `./server/env/${process.env.NODE_ENV}.env`})
if (result.error) {
    console.log('Error loading .env file:', result.error);
  } else {
    console.log('.env file loaded successfully');
  }

// 透過 new 建立 Sequelize 這個 class，而 sequelize 就是物件 instance
export const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

