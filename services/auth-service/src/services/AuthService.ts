import { User, UserDocument } from '../models/User';
import { UserRegistration, UserLogin, AuthToken, ApiResponse, SupportedLanguage } from '@codementor/types';
import { hashPassword, verifyPassword, generateToken, generateSecureId } from '@codementor/shared';
import { logger } from '@codementor/shared';

/**
 * Authentication service handling user registration, login, and token management
 */
export class AuthService {
  /**
   * Register a new user
   */
  public async register(registrationData: UserRegistration): Promise<ApiResponse<{
    user: any;
    token: string;
    refreshToken: string;
  }>> {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [
          { email: registrationData.email.toLowerCase() },
          { username: registrationData.username }
        ]
      });

      if (existingUser) {
        return {
          success: false,
          error: {
            code: 'USER_EXISTS',
            message: 'User with this email or username already exists',
            statusCode: 409
          }
        };
      }

      // Validate password strength
      if (registrationData.password.length < 8) {
        return {
          success: false,
          error: {
            code: 'WEAK_PASSWORD',
            message: 'Password must be at least 8 characters long',
            statusCode: 400
          }
        };
      }

      // Hash password
      const passwordHash = await hashPassword(registrationData.password);

      // Create user with initial preferences
      const userData = {
        email: registrationData.email.toLowerCase(),
        username: registrationData.username,
        passwordHash,
        learningLevel: 'beginner' as const,
        preferences: {
          explanationStyle: 'detailed' as const,
          detailLevel: 'basic' as const,
          preferredLanguages: registrationData.initialLanguage ? [registrationData.initialLanguage] : ['python' as SupportedLanguage],
          theme: 'light' as const,
          notifications: true
        },
        progress: {
          completedModules: [],
          currentLanguage: registrationData.initialLanguage || 'python' as SupportedLanguage,
          streakDays: 0,
          totalInteractions: 0,
          lastActiveDate: new Date()
        },
        interactionHistory: [],
        refreshTokens: []
      };

      const user = new User(userData);
      await user.save();

      // Generate tokens
      const tokenPayload = {
        userId: user._id.toString(),
        email: user.email,
        username: user.username
      };

      const token = generateToken(tokenPayload);
      const refreshToken = generateSecureId(64);

      // Store refresh token
      user.refreshTokens.push(refreshToken);
      await user.save();

      logger.info(`User registered successfully: ${user.email}`);

      return {
        success: true,
        data: {
          user: user.toJSON(),
          token,
          refreshToken
        }
      };

    } catch (error) {
      logger.error('Registration error:', error);
      return {
        success: false,
        error: {
          code: 'REGISTRATION_FAILED',
          message: 'Failed to register user',
          statusCode: 500,
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  /**
   * Authenticate user login
   */
  public async login(loginData: UserLogin): Promise<ApiResponse<{
    user: any;
    token: string;
    refreshToken: string;
  }>> {
    try {
      // Find user by email
      const user = await User.findOne({ email: loginData.email.toLowerCase() });

      if (!user) {
        return {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
            statusCode: 401
          }
        };
      }

      // Check if account is locked
      if (user.isLocked) {
        return {
          success: false,
          error: {
            code: 'ACCOUNT_LOCKED',
            message: 'Account is temporarily locked due to too many failed login attempts',
            statusCode: 423
          }
        };
      }

      // Verify password
      const isPasswordValid = await verifyPassword(loginData.password, user.passwordHash);

      if (!isPasswordValid) {
        // Increment login attempts
        await user.incLoginAttempts();
        
        return {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
            statusCode: 401
          }
        };
      }

      // Reset login attempts on successful login
      if (user.loginAttempts > 0) {
        await user.resetLoginAttempts();
      }

      // Update last login time
      user.lastLoginAt = new Date();
      user.progress.lastActiveDate = new Date();

      // Generate tokens
      const tokenPayload = {
        userId: user._id.toString(),
        email: user.email,
        username: user.username
      };

      const token = generateToken(tokenPayload);
      const refreshToken = generateSecureId(64);

      // Store refresh token (limit to 5 active refresh tokens)
      user.refreshTokens.push(refreshToken);
      if (user.refreshTokens.length > 5) {
        user.refreshTokens = user.refreshTokens.slice(-5);
      }

      await user.save();

      logger.info(`User logged in successfully: ${user.email}`);

      return {
        success: true,
        data: {
          user: user.toJSON(),
          token,
          refreshToken
        }
      };

    } catch (error) {
      logger.error('Login error:', error);
      return {
        success: false,
        error: {
          code: 'LOGIN_FAILED',
          message: 'Failed to authenticate user',
          statusCode: 500,
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  /**
   * Refresh access token using refresh token
   */
  public async refreshToken(refreshToken: string): Promise<ApiResponse<{
    token: string;
    refreshToken: string;
  }>> {
    try {
      // Find user with the refresh token
      const user = await User.findOne({ refreshTokens: refreshToken });

      if (!user) {
        return {
          success: false,
          error: {
            code: 'INVALID_REFRESH_TOKEN',
            message: 'Invalid refresh token',
            statusCode: 401
          }
        };
      }

      // Generate new tokens
      const tokenPayload = {
        userId: user._id.toString(),
        email: user.email,
        username: user.username
      };

      const newToken = generateToken(tokenPayload);
      const newRefreshToken = generateSecureId(64);

      // Replace old refresh token with new one
      const tokenIndex = user.refreshTokens.indexOf(refreshToken);
      user.refreshTokens[tokenIndex] = newRefreshToken;
      await user.save();

      return {
        success: true,
        data: {
          token: newToken,
          refreshToken: newRefreshToken
        }
      };

    } catch (error) {
      logger.error('Token refresh error:', error);
      return {
        success: false,
        error: {
          code: 'TOKEN_REFRESH_FAILED',
          message: 'Failed to refresh token',
          statusCode: 500,
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  /**
   * Logout user by invalidating refresh token
   */
  public async logout(refreshToken: string): Promise<ApiResponse<void>> {
    try {
      const user = await User.findOne({ refreshTokens: refreshToken });

      if (user) {
        // Remove the refresh token
        user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
        await user.save();
      }

      return {
        success: true
      };

    } catch (error) {
      logger.error('Logout error:', error);
      return {
        success: false,
        error: {
          code: 'LOGOUT_FAILED',
          message: 'Failed to logout user',
          statusCode: 500,
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  /**
   * Get user by ID
   */
  public async getUserById(userId: string): Promise<ApiResponse<any>> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            statusCode: 404
          }
        };
      }

      return {
        success: true,
        data: user.toJSON()
      };

    } catch (error) {
      logger.error('Get user error:', error);
      return {
        success: false,
        error: {
          code: 'GET_USER_FAILED',
          message: 'Failed to retrieve user',
          statusCode: 500,
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  /**
   * Perform initial knowledge assessment for new users
   */
  public async performKnowledgeAssessment(userId: string, responses: any[]): Promise<ApiResponse<{
    assessmentScore: number;
    recommendedLevel: 'beginner' | 'intermediate' | 'advanced';
  }>> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            statusCode: 404
          }
        };
      }

      // Simple scoring algorithm based on responses
      // In a real implementation, this would be more sophisticated
      const totalQuestions = responses.length;
      const correctAnswers = responses.filter(response => response.correct).length;
      const assessmentScore = Math.round((correctAnswers / totalQuestions) * 100);

      // Determine recommended level
      let recommendedLevel: 'beginner' | 'intermediate' | 'advanced';
      if (assessmentScore >= 80) {
        recommendedLevel = 'advanced';
      } else if (assessmentScore >= 60) {
        recommendedLevel = 'intermediate';
      } else {
        recommendedLevel = 'beginner';
      }

      // Update user profile
      user.progress.knowledgeAssessmentScore = assessmentScore;
      user.learningLevel = recommendedLevel;
      await user.save();

      logger.info(`Knowledge assessment completed for user ${userId}: ${assessmentScore}% (${recommendedLevel})`);

      return {
        success: true,
        data: {
          assessmentScore,
          recommendedLevel
        }
      };

    } catch (error) {
      logger.error('Knowledge assessment error:', error);
      return {
        success: false,
        error: {
          code: 'ASSESSMENT_FAILED',
          message: 'Failed to perform knowledge assessment',
          statusCode: 500,
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }
}