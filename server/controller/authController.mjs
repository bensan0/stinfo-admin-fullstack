'use strict'

import { check } from "express-validator"
import AdminUserDao from "../dao/adminUserDao.mjs"
import { Util } from '../util/util.mjs'

export const AuthController = {
    login: async (req, res, next) => {
        let admin = await AdminUserDao.findByUsername(req.body.username)
        if (admin === null) {
            return res.sendWrapped('404', null, 'admin not found')
        }

        let check = Util.checkPassword(req.body.password, admin.password, admin.salt)
        if (check) {
            return res.sendWrapped('200', Util.genToken(admin.id, admin.username), '')

        } else {
            return res.sendWrapped('403', null, 'password wrong')

        }
    },

    checkLogin: (req, res, next) => {
        console.log('check login開始')
        let check = Util.checkToken(req.body.token)
        if (check) {
            return res.sendWrapped('200', true, '')

        } else {
            return res.sendWrapped('401', false, '')

        }
    }
}