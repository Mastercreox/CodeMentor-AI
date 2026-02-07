import { Request, Response, NextFunction } from 'express';
import { logger } from '@codementor/shared';
import { toApiError, isOperationalError } from '@codementor/shared';
import { ApiResponse } from '@codementor/types';

/**
 * Global error handling middleware
 */
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log error
  logger.error('API Gateway Error', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    userId: (req as any).user?.userId,
    type: 'api_error'
  });

  // Convert to API error format
  const apiError = toApiError(error);
  
  // Determine if we should expose error details
  const isDevelopment = process.env.NODE_ENV === 'development';
  const shouldExposeDetails = isDevelopment || isOperationalError(error);

  const response: ApiResponse = {
    success: false,
    error: {
      code: apiError.code,
      message: shouldExposeDetails ? apiError.message : 'An unexpected error occurred',
      statusCode: apiError.statusCode,
      ...(shouldExposeDetails && apiError.details && { details: apiError.details })
    },
    metadata: {
      timestamp: new Date().toISOString(),
      requestId: (req as any).requestId || 'unknown',
      processingTime: Date.now() - (req as any).startTime || 0
    }
  };

  res.status(apiError.statusCode).json(response);
}