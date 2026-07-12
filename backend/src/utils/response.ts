import { Response } from 'express';

interface SuccessResponse<T> {
  success: true;
  message: string;
  data?: T;
  meta?: any;
}

interface ErrorResponse {
  success: false;
  message: string;
  errors?: any[];
}

export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message: string = 'Operation successful',
  statusCode: number = 200,
  meta?: any
) => {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
    ...(meta !== undefined && { meta })
  };

  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 400,
  errors?: any[]
) => {
  const response: ErrorResponse = {
    success: false,
    message,
    ...(errors !== undefined && { errors })
  };

  return res.status(statusCode).json(response);
};
