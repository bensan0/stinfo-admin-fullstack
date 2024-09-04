"use strict";

import express from 'express';
import cors from 'cors';
import config from './config/index.mjs';
import * as middleware from './middleware.mjs';
import router from './routes/index.mjs';


// 引入express
const app = express();

console.log(`Running in ${process.env.NODE_ENV || 'dev'} mode`);
console.log(`Database: ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DB}`);
console.log(`API URL: ${config.apiUrl}`);

// 引入cors
app.use(cors());

// 使用json模組解析req body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 自定義中間件
app.use(middleware.responseWrapper)
app.use(middleware.authLogin)

// 路由器
app.use(router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
