import { Response } from 'express';
import { validationResult } from 'express-validator';
import {
  getProgressByUserAndCourse,
  updateProgress,
  createProgress,
  getProgressByUserId,
} from '../models/Progress';
import { getCourseById } from '../models/Course';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export const getProgress = (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const courseId = parseInt(req.params.courseId, 10);

  if (!userId) {
    return errorResponse(res, '未认证', 401);
  }

  if (isNaN(courseId)) {
    return errorResponse(res, '无效的课程ID', 400);
  }

  const course = getCourseById(courseId);
  if (!course) {
    return errorResponse(res, '课程不存在', 404);
  }

  let progress = getProgressByUserAndCourse(userId, courseId);
  if (!progress) {
    createProgress(userId, courseId);
    progress = getProgressByUserAndCourse(userId, courseId);
  }

  return successResponse(res, { progress, course }, '获取学习进度成功');
};

export const updateProgressController = (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, '参数验证失败', 400, errors.array());
  }

  const userId = req.user?.id;
  const courseId = parseInt(req.params.courseId, 10);
  const { progress_percent, last_lesson, completed_lessons } = req.body;

  if (!userId) {
    return errorResponse(res, '未认证', 401);
  }

  if (isNaN(courseId)) {
    return errorResponse(res, '无效的课程ID', 400);
  }

  const course = getCourseById(courseId);
  if (!course) {
    return errorResponse(res, '课程不存在', 404);
  }

  let progress = getProgressByUserAndCourse(userId, courseId);
  if (!progress) {
    createProgress(userId, courseId);
  }

  const completedLessonsStr = Array.isArray(completed_lessons)
    ? JSON.stringify(completed_lessons)
    : completed_lessons || '[]';

  updateProgress(
    userId,
    courseId,
    progress_percent ?? 0,
    last_lesson ?? 0,
    completedLessonsStr
  );

  progress = getProgressByUserAndCourse(userId, courseId);

  return successResponse(res, { progress }, '更新学习进度成功');
};

export const getAllProgress = (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return errorResponse(res, '未认证', 401);
  }

  const progressList = getProgressByUserId(userId);

  const result = progressList.map((progress) => {
    const course = getCourseById(progress.course_id);
    return {
      ...progress,
      completed_lessons: JSON.parse(progress.completed_lessons || '[]'),
      course,
    };
  });

  return successResponse(res, { progress_list: result }, '获取所有学习进度成功');
};
