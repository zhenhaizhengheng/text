import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  toSafeUser,
  SafeUser,
} from '../models/User';
import { hashPassword, comparePassword } from '../utils/password';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, '参数验证失败', 400, errors.array());
  }

  const { username, email, password } = req.body;

  const existingEmail = findUserByEmail(email);
  if (existingEmail) {
    return errorResponse(res, '邮箱已被注册', 409);
  }

  const existingUsername = findUserByUsername(username);
  if (existingUsername) {
    return errorResponse(res, '用户名已被使用', 409);
  }

  const passwordHash = await hashPassword(password);
  const userId = createUser(username, email, passwordHash);

  const user = findUserById(userId);
  if (!user) {
    return errorResponse(res, '用户创建失败', 500);
  }

  const safeUser = toSafeUser(user);
  const token = jwt.sign({ userId: user.id }, jwtConfig.secret as jwt.Secret, {
    expiresIn: jwtConfig.expiresIn as any,
  });

  return successResponse(res, { user: safeUser, token }, '注册成功', 201);
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, '参数验证失败', 400, errors.array());
  }

  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user) {
    return errorResponse(res, '邮箱或密码错误', 401);
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return errorResponse(res, '邮箱或密码错误', 401);
  }

  const safeUser = toSafeUser(user);
  const token = jwt.sign({ userId: user.id }, jwtConfig.secret as jwt.Secret, {
    expiresIn: jwtConfig.expiresIn as any,
  });

  return successResponse(res, { user: safeUser, token }, '登录成功');
};

export const getCurrentUser = (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return errorResponse(res, '未认证', 401);
  }
  return successResponse(res, { user: req.user }, '获取用户信息成功');
};
