'use strict';

import { userDao } from '../dao/userDao.mjs'

export const UserController = {
    getInfo: async (req, res, next) => {
        try {
            let result = await userDao.findById(req.params.id)
            res.sendWrapped(200, result, null)
        } catch (error) {
            res.sendWrapped(500, null, error.message)
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            let result = await userDao.resetPassword(req.body.id)
            res.sendWrapped(200, result, null)
        } catch (error) {
            res.sendWrapped(500, null, error.message)
        }
    }
}