import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { findUserById, toSafeUser, SafeUser } from '../models/User';
import { errorResponse } from '../utils/response';

export interface AuthRequest extends Request {
  user?: SafeUser;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, '未提供认证令牌', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as { userId: number };
    const user = findUserById(decoded.userId);

    if (!user) {
      return errorResponse(res, '用户不存在', 401);
    }

    req.user = toSafeUser(user);
    next();
  } catch (error) {
    return errorResponse(res, '认证令牌无效或已过期', 401);
  }
};
