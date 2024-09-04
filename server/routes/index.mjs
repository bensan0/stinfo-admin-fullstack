'use strict'

import express from 'express';
import adminuser from './adminuserRoute.mjs'
import platuser from './userRoute.mjs'
import auth from './AuthRoute.mjs'

const router = express.Router()

router.use('/auth', auth)

router.use('/admin', adminuser)

router.use('/user', platuser)

export default router
