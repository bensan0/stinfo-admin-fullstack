'use strict'

import { Router } from 'express'
import { AdminUserController } from '../controller/adminuserController.mjs'

const router = Router();

router.get('/me', AdminUserController.getInfo)

router.post('/change-password', AdminUserController.changePassword)

export default router;