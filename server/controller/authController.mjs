'use strict'

import AdminUserDao from "../dao/adminUserDao.mjs"
import { Util } from '../util/util.mjs'

export const AuthController = {
    login: async (req, res, next) => {
        let admin = await AdminUserDao.findByUsername(req.body.username)
        if(admin === null){
            res.sendWrapped(404, null, 'admin not found')
            return
        }
        
        let check = Util.checkPassword(req.body.password, admin.password, admin.salt)
        if(check){
            res.sendWrapped(200, Util.genToken(admin.id, admin.username), '')
            return
        }else{
            res.sendWrapped(403, null, 'password wrong')
            return
        }
    }
}