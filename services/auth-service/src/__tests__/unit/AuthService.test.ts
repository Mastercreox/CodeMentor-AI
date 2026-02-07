import { AuthService } from '../../services/AuthService';
import { User } from '../../models/User';
import { hashPassword } from '@codementor/shared';

// Mock dependencies
jest.mock('../../models/User');
jest.mock('@codementor/shared', () => ({
  ...jest.requireActual('@codementor/shared'),
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
  generateToken: jest.fn(),
  generateSecureId: jest.fn(),
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}));

const MockedUser = User as jest.Mocked<typeof User>;
const mockedHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>;

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('register', () => {
    const validRegistrationData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'TestPassword123',
      initialLanguage: 'python' as const
    };

    it('should successfully register a new user', async () => {
      // Mock User.findOne to return null (user doesn't exist)
      MockedUser.findOne = jest.fn().mockResolvedValue(null);
      
      // Mock password hashing
      mockedHashPassword.mockResolvedValue('hashedPassword123');

      // Mock user creation and save
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        username: 'testuser',
        save: jest.fn().mockResolvedValue(true),
        toJSON: jest.fn().mockReturnValue({
          userId: 'user123',
          email: 'test@example.com',
          username: 'testuser'
        }),
        refreshTokens: []
      };

      MockedUser.prototype.constructor = jest.fn().mockReturnValue(mockUser);
      MockedUser.prototype.save = mockUser.save;

      // Mock token generation
      const { generateToken, generateSecureId } = require('@codementor/shared');
      generateToken.mockReturnValue('jwt-token');
      generateSecureId.mockReturnValue('refresh-token');

      const result = await authService.register(validRegistrationData);

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('user');
      expect(result.data).toHaveProperty('token');
      expect(result.data).toHaveProperty('refreshToken');
    });

    it('should fail when user already exists', async () => {
      // Mock User.findOne to return existing user
      MockedUser.findOne = jest.fn().mockResolvedValue({
        email: 'test@example.com',
        username: 'testuser'
      });

      const result = await authService.register(validRegistrationData);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('USER_EXISTS');
      expect(result.error?.statusCode).toBe(409);
    });

    it('should fail with weak password', async () => {
      const weakPasswordData = {
        ...validRegistrationData,
        password: '123' // Too short
      };

      const result = await authService.register(weakPasswordData);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('WEAK_PASSWORD');
      expect(result.error?.statusCode).toBe(400);
    });

    it('should handle database errors gracefully', async () => {
      MockedUser.findOne = jest.fn().mockRejectedValue(new Error('Database connection failed'));

      const result = await authService.register(validRegistrationData);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('REGISTRATION_FAILED');
      expect(result.error?.statusCode).toBe(500);
    });
  });

  describe('login', () => {
    const validLoginData = {
      email: 'test@example.com',
      password: 'TestPassword123'
    };

    it('should successfully login with valid credentials', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        username: 'testuser',
        passwordHash: 'hashedPassword123',
        isLocked: false,
        loginAttempts: 0,
        refreshTokens: [],
        progress: { lastActiveDate: new Date() },
        resetLoginAttempts: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(true),
        toJSON: jest.fn().mockReturnValue({
          userId: 'user123',
          email: 'test@example.com',
          username: 'testuser'
        })
      };

      MockedUser.findOne = jest.fn().mockResolvedValue(mockUser);

      // Mock password verification
      const { verifyPassword, generateToken, generateSecureId } = require('@codementor/shared');
      verifyPassword.mockResolvedValue(true);
      generateToken.mockReturnValue('jwt-token');
      generateSecureId.mockReturnValue('refresh-token');

      const result = await authService.login(validLoginData);

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('user');
      expect(result.data).toHaveProperty('token');
      expect(result.data).toHaveProperty('refreshToken');
    });

    it('should fail with invalid email', async () => {
      MockedUser.findOne = jest.fn().mockResolvedValue(null);

      const result = await authService.login(validLoginData);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('INVALID_CREDENTIALS');
      expect(result.error?.statusCode).toBe(401);
    });

    it('should fail with invalid password', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        passwordHash: 'hashedPassword123',
        isLocked: false,
        incLoginAttempts: jest.fn().mockResolvedValue(true)
      };

      MockedUser.findOne = jest.fn().mockResolvedValue(mockUser);

      // Mock password verification to fail
      const { verifyPassword } = require('@codementor/shared');
      verifyPassword.mockResolvedValue(false);

      const result = await authService.login(validLoginData);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('INVALID_CREDENTIALS');
      expect(result.error?.statusCode).toBe(401);
      expect(mockUser.incLoginAttempts).toHaveBeenCalled();
    });

    it('should fail when account is locked', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        isLocked: true
      };

      MockedUser.findOne = jest.fn().mockResolvedValue(mockUser);

      const result = await authService.login(validLoginData);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('ACCOUNT_LOCKED');
      expect(result.error?.statusCode).toBe(423);
    });
  });

  describe('refreshToken', () => {
    it('should successfully refresh token with valid refresh token', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        username: 'testuser',
        refreshTokens: ['valid-refresh-token'],
        save: jest.fn().mockResolvedValue(true)
      };

      MockedUser.findOne = jest.fn().mockResolvedValue(mockUser);

      const { generateToken, generateSecureId } = require('@codementor/shared');
      generateToken.mockReturnValue('new-jwt-token');
      generateSecureId.mockReturnValue('new-refresh-token');

      const result = await authService.refreshToken('valid-refresh-token');

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('token');
      expect(result.data).toHaveProperty('refreshToken');
    });

    it('should fail with invalid refresh token', async () => {
      MockedUser.findOne = jest.fn().mockResolvedValue(null);

      const result = await authService.refreshToken('invalid-refresh-token');

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('INVALID_REFRESH_TOKEN');
      expect(result.error?.statusCode).toBe(401);
    });
  });

  describe('performKnowledgeAssessment', () => {
    it('should successfully perform knowledge assessment', async () => {
      const mockUser = {
        _id: 'user123',
        progress: {},
        save: jest.fn().mockResolvedValue(true)
      };

      MockedUser.findById = jest.fn().mockResolvedValue(mockUser);

      const responses = [
        { correct: true },
        { correct: true },
        { correct: false },
        { correct: true },
        { correct: true }
      ];

      const result = await authService.performKnowledgeAssessment('user123', responses);

      expect(result.success).toBe(true);
      expect(result.data?.assessmentScore).toBe(80);
      expect(result.data?.recommendedLevel).toBe('advanced');
    });

    it('should recommend beginner level for low scores', async () => {
      const mockUser = {
        _id: 'user123',
        progress: {},
        save: jest.fn().mockResolvedValue(true)
      };

      MockedUser.findById = jest.fn().mockResolvedValue(mockUser);

      const responses = [
        { correct: false },
        { correct: false },
        { correct: true },
        { correct: false },
        { correct: false }
      ];

      const result = await authService.performKnowledgeAssessment('user123', responses);

      expect(result.success).toBe(true);
      expect(result.data?.assessmentScore).toBe(20);
      expect(result.data?.recommendedLevel).toBe('beginner');
    });

    it('should fail when user not found', async () => {
      MockedUser.findById = jest.fn().mockResolvedValue(null);

      const result = await authService.performKnowledgeAssessment('nonexistent', []);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('USER_NOT_FOUND');
      expect(result.error?.statusCode).toBe(404);
    });
  });
});