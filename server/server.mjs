"use strict";

import express from 'express';
import cors from 'cors';
import config from './config/index.mjs';
import * as middleware from './middleware.mjs';
import userRouter from './routes/userRoute.mjs';
import adminuserRouter from './routes/adminuserRoute.mjs';

// 引入express模块
const app = express();

console.log(`Running in ${process.env.NODE_ENV || 'development'} mode`);
console.log(`Server port: ${config.port}`);
console.log(`Database: ${config.database.host}:${config.database.port}/${config.database.name}`);
console.log(`API URL: ${config.apiUrl}`);

// 引入cors模块，处理跨域问题
app.use(cors());

// 使用json模組解析req body
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// 自定義中間件
app.use(middleware.responseWrapper)
//todo session

// 路由器
app.use('/login')
app.use('/user', userRouter)
app.use('/admin', adminuserRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
