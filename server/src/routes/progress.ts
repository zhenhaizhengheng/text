import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProgress,
  updateProgressController,
  getAllProgress,
} from '../controllers/progressController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getAllProgress);
router.get('/:courseId', authMiddleware, getProgress);
router.put(
  '/:courseId',
  authMiddleware,
  [
    body('progress_percent').optional().isFloat({ min: 0, max: 100 }).withMessage('进度百分比需在0-100之间'),
    body('last_lesson').optional().isInt({ min: 0 }).withMessage('最后学习的课时必须是正整数'),
    body('completed_lessons').optional().isArray().withMessage('已完成课时必须是数组'),
  ],
  updateProgressController
);

export default router;
