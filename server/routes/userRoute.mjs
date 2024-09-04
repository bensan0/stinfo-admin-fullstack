"use strict"

import { Router } from 'express'
import { UserController } from '../controller/userController.mjs'

const router = Router();

router.get('/info', UserController.getInfo)

router.post('/reset-password', UserController.resetPassword)

export default router;