'use strict';

import { AdminUserDao } from "../dao/adminUserDao.mjs";
import jwt from "jsonwebtoken";

export const AdminUserController = {

    me: async (req, res, next) => {
        try {
            const secret = process.env.JWT_SECRET
            const token = req.header('AuthToken')
            console.log('token laaaaaa: ' + token)
            const decoded = jwt.verify(token, secret);
            console.log('me decoded: ' + JSON.stringify(decoded))
            const adminuser = await AdminUserDao.findById(decoded.id)

            return res.sendWrapped('200', adminuser, '')
        } catch (error) {
            return res.sendWrapped('500', null, error.message)
        }
    },

    getInfo: async (req, res, next) => {
        try {
            const adminuser = await AdminUserDao.findById(req.query.id)
            if (adminuser === null) {
                return res.sendWrapped('404', null, 'admin not found')
            }
            return res.sendWrapped('200', adminuser, '')
        } catch (error) {
            return res.sendWrapped('500', null, error.message)
        }
    },

    changePassword: async (req, res, next) => {
        try {
            //核對密碼
            const check = await AdminUserDao.comparePassword(req.body.id, req.body.nowPassword)
            //變更密碼
            if (check) {
                console.log('check la!!')
                await AdminUserDao.updatePassword(req.body.id, req.body.newPassword)
                console.log('controller')
                return res.sendWrapped('200', null, '')

            } else {
                return res.sendWrapped('403', null, '舊密碼輸入錯誤')

            }
        } catch (error) {
            console.log('controller 變更密碼錯誤抓到')
            return res.sendWrapped('500', null, error.message)
        }
    }
}