'use strict'

import { Router } from 'express'
import { AdminUserController } from '../controller/adminuserController.mjs'
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/me', AdminUserController.me)

const validateChangePassword = [
    body('id').notEmpty().withMessage('用戶id不可為空'),
    body('newPassword').isLength({ min: 1 }).withMessage('新密碼不可為空'),
    body('nowPassword').notEmpty().withMessage('現密碼不可為空'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.sendWrapped('400', null, errors.array()[0].msg);
      }
      next();
    }
  ];
router.post('/change-password', validateChangePassword, AdminUserController.changePassword)



export default router;