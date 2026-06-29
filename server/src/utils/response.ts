import { Response } from 'express';

interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

interface ErrorResponse {
  success: false;
  message: string;
  errors?: any[];
}

export const successResponse = <T>(res: Response, data: T, message?: string, statusCode: number = 200): Response => {
  const response: SuccessResponse<T> = {
    success: true,
    data,
  };
  if (message) {
    response.message = message;
  }
  return res.status(statusCode).json(response);
};

export const errorResponse = (res: Response, message: string, statusCode: number = 400, errors?: any[]): Response => {
  const response: ErrorResponse = {
    success: false,
    message,
  };
  if (errors && errors.length > 0) {
    response.errors = errors;
  }
  return res.status(statusCode).json(response);
};
