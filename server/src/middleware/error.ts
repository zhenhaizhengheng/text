import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export class AppError extends Error {
  statusCode: number;
  errors?: any[];

  constructor(message: string, statusCode: number = 500, errors?: any[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'AppError';
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err.message);

  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode, err.errors);
  }

  return errorResponse(res, '服务器内部错误', 500);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  return errorResponse(res, `路由 ${req.method} ${req.path} 不存在`, 404);
};
