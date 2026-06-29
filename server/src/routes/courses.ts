import { Router } from 'express';
import {
  listCourses,
  getCourseDetail,
  enrollCourse,
  getLearningRecords,
} from '../controllers/courseController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', listCourses);
router.get('/records', authMiddleware, getLearningRecords);
router.get('/:id', getCourseDetail);
router.post('/:id/enroll', authMiddleware, enrollCourse);

export default router;
