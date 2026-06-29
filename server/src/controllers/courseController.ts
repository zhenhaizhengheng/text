import { Request, Response } from 'express';
import {
  getAllCourses,
  getCourseById,
  getCoursesByCategory,
  searchCourses,
} from '../models/Course';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';
import {
  getProgressByUserAndCourse,
  createProgress,
} from '../models/Progress';

export const listCourses = (req: Request, res: Response) => {
  const { category, keyword } = req.query;

  let courses;
  if (keyword) {
    courses = searchCourses(keyword as string);
  } else if (category) {
    courses = getCoursesByCategory(category as string);
  } else {
    courses = getAllCourses();
  }

  return successResponse(res, { courses }, '获取课程列表成功');
};

export const getCourseDetail = (req: Request, res: Response) => {
  const courseId = parseInt(req.params.id, 10);

  if (isNaN(courseId)) {
    return errorResponse(res, '无效的课程ID', 400);
  }

  const course = getCourseById(courseId);
  if (!course) {
    return errorResponse(res, '课程不存在', 404);
  }

  return successResponse(res, { course }, '获取课程详情成功');
};

export const enrollCourse = (req: AuthRequest, res: Response) => {
  const courseId = parseInt(req.params.id, 10);
  const userId = req.user?.id;

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

  const existingProgress = getProgressByUserAndCourse(userId, courseId);
  if (existingProgress) {
    return errorResponse(res, '您已报名该课程', 409);
  }

  createProgress(userId, courseId);

  return successResponse(res, { enrolled: true }, '课程报名成功', 201);
};

export const getLearningRecords = (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return errorResponse(res, '未认证', 401);
  }

  const { getProgressByUserId } = require('../models/Progress');
  const progressList = getProgressByUserId(userId);

  const records = progressList.map((progress: any) => {
    const course = getCourseById(progress.course_id);
    return {
      progress,
      course,
    };
  });

  return successResponse(res, { records }, '获取学习记录成功');
};
