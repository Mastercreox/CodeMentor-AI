import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader, AuthenticationError } from '@codementor/shared';
import { AuthToken } from '@codementor/types';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: AuthToken;
    }
  }
}

/**
 * Authentication middleware
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      throw new AuthenticationError('Authentication token required');
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
export function optionalAuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (token) {
      const decoded = verifyToken(token);
      req.user = decoded;
    }
    
    next();
  } catch (error) {
    // Ignore authentication errors for optional auth
    next();
  }
}