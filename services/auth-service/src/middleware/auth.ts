import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { verifyToken } from '@codementor/shared';
import { ApiResponse } from '@codementor/types';
import { logger } from '@codementor/shared';

/**
 * Extended request interface with user information
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    username: string;
  };
}

/**
 * JWT authentication middleware
 */
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'MISSING_TOKEN',
        message: 'Access token is required',
        statusCode: 401
      }
    };
    return res.status(401).json(response);
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Token verification failed:', error);
    
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired access token',
        statusCode: 401
      }
    };
    return res.status(401).json(response);
  }
};

/**
 * Create rate limiting middleware for authentication endpoints
 */
export const authRateLimit = (maxAttempts: number, windowMs: number) => {
  return rateLimit({
    windowMs,
    max: maxAttempts,
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: `Too many authentication attempts. Please try again later.`,
        statusCode: 429
      }
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Use IP address for rate limiting
    keyGenerator: (req: Request) => {
      return req.ip || req.connection.remoteAddress || 'unknown';
    },
    // Skip successful requests from counting against the limit
    skipSuccessfulRequests: true,
    // Custom handler for rate limit exceeded
    handler: (req: Request, res: Response) => {
      logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
      
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many authentication attempts. Please try again later.',
          statusCode: 429
        }
      };
      
      res.status(429).json(response);
    }
  });
};

/**
 * Optional authentication middleware - doesn't fail if no token provided
 */
export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
  } catch (error) {
    // Log the error but don't fail the request
    logger.debug('Optional auth token verification failed:', error);
  }

  next();
};