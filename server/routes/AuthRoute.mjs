'use strict'

import { Router } from 'express'
import { AuthController } from '../controller/authController.mjs'

const router = Router()

router.post('/login', AuthController.login)

router.post('/checkLogin', AuthController.checkLogin)

export default router