'use strict';

import { AdminUserDao } from "../dao/adminUserDao.mjs";

export const AdminUserController = {

    getInfo: async (req, res, next) => {
        try {
            const adminuser = await AdminUserDao.findById(req.query.id)
            if(adminuser === null){
                res.sendWrapped(404, null, 'admin not found')
                return
            }
            res.sendWrapped(200, adminuser, '')
            return
        } catch (error) {
            res.sendWrapped(500, null, error.message)
            return
        }
    },

    changePassword: async (req, res, next) => {
        try {
            //核對密碼
            const check = await AdminUserDao.comparePassword(req.body.id, req.body.oldPassword)
            //變更密碼
            if(check){
                await AdminUserDao.updatePassword(req.body.id, req.body.newPassword)
                res.sendWrapped(200, null, '')
                return
            }else{
                res.sendWrapped(403, null, '舊密碼輸入錯誤')
                return
            }
        } catch (error) {
            res.sendWrapped(500, null, error.message)
            return
        }
    }
}