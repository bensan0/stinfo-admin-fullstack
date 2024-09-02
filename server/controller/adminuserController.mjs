'use strict';

import adminUserDao from "../dao/adminUserDao.mjs";

export const getInfo = async (req, res, next) => {
    try {
        let result = await adminUserDao.findById(req.params.id)
        res.sendWrapped(200, result, null)
    } catch (error) {
        res.sendWrapped(500, null, error.message)
    }
}