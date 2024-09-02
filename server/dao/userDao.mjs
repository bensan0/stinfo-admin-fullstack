"use strict";

import PlatUser from "../model/platuser.mjs";
import strRandom from 'string-random'
import crypto from 'crypto'

export const userDao = {
    // 根據 ID 查找用戶
    findById: async (id) => {
        return await PlatUser.findByPk(id);
    },

    // 根據用戶名查找用戶
    findByUsername: async (username) => {
        return await PlatUser.findOne({ where: { username } });
    },

    // 重置用戶密碼
    resetPassword: async (id) => {
        let newSalt = strRandom(16)
        let newPass = strRandom()
        const md5 = crypto.createHash('md5')
        await PlatUser.update(
            {
                salt: newSalt,
                password: md5.update(newPass + newSalt).digest('hex')
            },
            {
                where: {
                    id: id
                }
            })
        return newPass
    }
}

