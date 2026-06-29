import { Router } from 'express';
import { body } from 'express-validator';
import {
  listPosts,
  getPostDetail,
  createPostController,
  likePost,
  unlikePost,
} from '../controllers/communityController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, listPosts);
router.get('/:id', authMiddleware, getPostDetail);
router.post(
  '/',
  authMiddleware,
  [
    body('content').isLength({ min: 1, max: 500 }).withMessage('内容长度需在1-500个字符之间'),
    body('images').optional().isArray().withMessage('图片必须是数组'),
  ],
  createPostController
);
router.post('/:id/like', authMiddleware, likePost);
router.delete('/:id/like', authMiddleware, unlikePost);

export default router;
