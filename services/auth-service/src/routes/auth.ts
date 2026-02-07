import { Router, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { UserRegistration, UserLogin, ApiResponse } from '@codementor/types';
import { authenticateToken, authRateLimit, AuthenticatedRequest } from '../middleware/auth';
import { body, validationResult } from 'express-validator';
import { logger } from '@codementor/shared';

const router = Router();
const authService = new AuthService();

/**
 * Validation middleware for registration
 */
const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('username')
    .isLength({ min: 3, max: 30 })
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username must be 3-30 characters and contain only letters, numbers, underscores, and hyphens'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must be at least 8 characters with at least one lowercase letter, one uppercase letter, and one number'),
  body('initialLanguage')
    .optional()
    .isIn(['python', 'javascript', 'java', 'cpp', 'html', 'css'])
    .withMessage('Initial language must be one of: python, javascript, java, cpp, html, css')
];

/**
 * Validation middleware for login
 */
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

/**
 * Handle validation errors
 */
const handleValidationErrors = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        statusCode: 400,
        details: errors.array()
      }
    };
    return res.status(400).json(response);
  }
  next();
};

/**
 * POST /register - Register a new user
 */
router.post('/register', 
  authRateLimit(3, 15 * 60 * 1000), // 3 attempts per 15 minutes
  validateRegistration,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const registrationData: UserRegistration = req.body;
      const result = await authService.register(registrationData);

      if (result.success) {
        logger.info(`User registration successful: ${registrationData.email}`);
        res.status(201).json(result);
      } else {
        res.status(result.error!.statusCode).json(result);
      }
    } catch (error) {
      logger.error('Registration endpoint error:', error);
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Internal server error',
          statusCode: 500
        }
      };
      res.status(500).json(response);
    }
  }
);

/**
 * POST /login - Authenticate user
 */
router.post('/login',
  authRateLimit(5, 15 * 60 * 1000), // 5 attempts per 15 minutes
  validateLogin,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const loginData: UserLogin = req.body;
      const result = await authService.login(loginData);

      if (result.success) {
        logger.info(`User login successful: ${loginData.email}`);
        res.status(200).json(result);
      } else {
        res.status(result.error!.statusCode).json(result);
      }
    } catch (error) {
      logger.error('Login endpoint error:', error);
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Internal server error',
          statusCode: 500
        }
      };
      res.status(500).json(response);
    }
  }
);

/**
 * POST /refresh - Refresh access token
 */
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'MISSING_REFRESH_TOKEN',
          message: 'Refresh token is required',
          statusCode: 400
        }
      };
      return res.status(400).json(response);
    }

    const result = await authService.refreshToken(refreshToken);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(result.error!.statusCode).json(result);
    }
  } catch (error) {
    logger.error('Token refresh endpoint error:', error);
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
        statusCode: 500
      }
    };
    res.status(500).json(response);
  }
});

/**
 * POST /logout - Logout user
 */
router.post('/logout', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'MISSING_REFRESH_TOKEN',
          message: 'Refresh token is required',
          statusCode: 400
        }
      };
      return res.status(400).json(response);
    }

    const result = await authService.logout(refreshToken);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Logout endpoint error:', error);
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
        statusCode: 500
      }
    };
    res.status(500).json(response);
  }
});

/**
 * GET /me - Get current user profile
 */
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const result = await authService.getUserById(userId);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(result.error!.statusCode).json(result);
    }
  } catch (error) {
    logger.error('Get user profile endpoint error:', error);
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
        statusCode: 500
      }
    };
    res.status(500).json(response);
  }
});

/**
 * POST /assessment - Perform knowledge assessment
 */
router.post('/assessment', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { responses } = req.body;

    if (!responses || !Array.isArray(responses)) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'INVALID_RESPONSES',
          message: 'Assessment responses are required and must be an array',
          statusCode: 400
        }
      };
      return res.status(400).json(response);
    }

    const result = await authService.performKnowledgeAssessment(userId, responses);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(result.error!.statusCode).json(result);
    }
  } catch (error) {
    logger.error('Knowledge assessment endpoint error:', error);
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
        statusCode: 500
      }
    };
    res.status(500).json(response);
  }
});

/**
 * GET /health - Health check endpoint
 */
router.get('/health', async (req: Request, res: Response) => {
  try {
    const { dbConnection } = await import('../config/database');
    const dbHealth = await dbConnection.getHealthStatus();
    
    const response = {
      status: dbHealth.status === 'healthy' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'auth-service',
      database: dbHealth
    };

    res.status(dbHealth.status === 'healthy' ? 200 : 503).json(response);
  } catch (error) {
    logger.error('Health check error:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'auth-service',
      error: 'Health check failed'
    });
  }
});

export default router;