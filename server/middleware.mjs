'use strict';

import { Util } from './util/util.mjs'

/**
 * 統一響應體格式
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const responseWrapper = (req, res, next) => {
  res.sendWrapped = (statusCode, data, message) => {
    res.status(200).json({
      status: statusCode,
      data: data || null,
      msg: message || null
    });
  };
  return next();
};

export const authLogin = (req, res, next) => {
  if (req.path === '/auth/login' || req.path === '/auth/checkLogin') {
    console.log('middle攔截, 去login')
    return next()
  }

  if (req.header('AuthToken')) {
    console.log('middle攔截, 檢查authtoken')
    let check = Util.checkToken(req.header('AuthToken'))
    if (check) {
      return next()
    } else {
      return res.sendWrapped('401', null, 'Token expired')
    }
  } else {
    return res.sendWrapped('401', null, 'Not yet login')
  }
}