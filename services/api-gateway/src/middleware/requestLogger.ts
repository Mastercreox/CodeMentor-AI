import { Request, Response, NextFunction } from 'express';
import { generateId } from '@codementor/shared';
import { logApiCall } from '@codementor/shared';

/**
 * Request logging middleware
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  // Add request ID and start time
  (req as any).requestId = generateId();
  (req as any).startTime = Date.now();

  // Log request completion
  res.on('finish', () => {
    const processingTime = Date.now() - (req as any).startTime;
    const userId = (req as any).user?.userId;

    logApiCall(
      req.method,
      req.path,
      res.statusCode,
      processingTime,
      userId
    );
  });

  next();
}