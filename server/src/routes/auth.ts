import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getCurrentUser } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post(
  '/register',
  [
    body('username').isLength({ min: 3, max: 20 }).withMessage('用户名长度需在3-20个字符之间'),
    body('email').isEmail().withMessage('请输入有效的邮箱地址'),
    body('password').isLength({ min: 6 }).withMessage('密码长度至少6位'),
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('请输入有效的邮箱地址'),
    body('password').notEmpty().withMessage('密码不能为空'),
  ],
  login
);

router.get('/me', authMiddleware, getCurrentUser);

export default router;
