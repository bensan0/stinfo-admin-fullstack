'use strict'

import { Router } from 'express'
import * as adminuserController from '../controller/adminuserController.mjs'

const router = Router();

router.get('/info/:id', adminuserController.getInfo)

router.post('/reset-password', adminuserController.resetPassword)

export default router;