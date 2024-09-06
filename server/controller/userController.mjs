'use strict'

import { userDao } from '../dao/userDao.mjs'

export const UserController = {
    getInfo: async (req, res, next) => {
        try {
            let result = await userDao.findByUsername(req.query.username)
            return res.sendWrapped('200', result, null)
        } catch (error) {
            return res.sendWrapped('500', null, error.message)
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            let newPass = await userDao.resetPassword(req.body.id)
            res.sendWrapped('200', newPass, null)
            return
        } catch (error) {
            res.sendWrapped('500', null, error.message)
            return
        }
    }
}