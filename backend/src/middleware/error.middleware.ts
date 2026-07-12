import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { ZodError } from 'zod';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Zod Validation Errors
  if (err instanceof ZodError || err.name === 'ZodError') {
    const issues = err.issues || err.errors || [];
    const errors = issues.map((e: any) => ({
      field: e.path ? e.path.join('.') : 'unknown',
      message: e.message
    }));
    return sendError(res, 'Validation failed', 400, errors);
  }

  // Handle standard errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Do not expose stack traces in production (handled by error message masking if needed)
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  sendError(res, message, statusCode);
};
