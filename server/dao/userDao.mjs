"use strict";

import PlatUser from "../model/platuser.mjs";
import { Util } from '../util/util.mjs'
import strRandom from 'string-random'
import crypto from 'crypto'
import dayjs from "dayjs";

export const userDao = {
    // 根據 ID 查找用戶
    findById: async (id) => {
        return await PlatUser.findByPk(id);
    },

    // 根據用戶名查找用戶
    findByUsername: async (username) => {
        return await PlatUser.findOne({ 
            attributes: ['id', 'username', 'created_at', 'status'],
            where: { username } 
        });
    },

    // 重置用戶密碼
    resetPassword: async (id) => {
        let result = Util.genPassword()
        await PlatUser.update(
            {
                salt: result.salt,
                password: result.hashedPass,
                updated_at: parseInt(dayjs().format('YYYYMMDDHHmmss'))
            },
            {
                where: {
                    id: id
                }
            })
        return result.rawPass
    }
}

