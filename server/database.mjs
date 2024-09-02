// 引入 sequelize 套件
import { Sequelize } from 'sequelize';
import config from './config/index.mjs';

const database = config.database

// 透過 new 建立 Sequelize 這個 class，而 sequelize 就是物件 instance
export const sequelize = new Sequelize('auth_service', database.username, database.password, {
  host: database.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

