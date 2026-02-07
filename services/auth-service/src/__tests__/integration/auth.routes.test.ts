import request from 'supertest';
import app from '../../index';
import { User } from '../../models/User';
import { dbConnection } from '../../config/database';
import { hashPassword } from '@codementor/shared';

// Mock database connection
jest.mock('../../config/database', () => ({
  dbConnection: {
    connect: jest.fn(),
    disconnect: jest.fn(),
    getHealthStatus: jest.fn().mockResolvedValue({
      status: 'healthy',
      details: {
        connected: true,
        readyState: 1,
        host: 'localhost',
        name: 'test-db'
      }
    })
  }
}));

// Mock User model
jest.mock('../../models/User');
const MockedUser = User as jest.Mocked<typeof User>;

// Mock shared utilities
jest.mock('@codementor/shared', () => ({
  ...jest.requireActual('@codementor/shared'),
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
  generateToken: jest.fn(),
  generateSecureId: jest.fn(),
  verifyToken: jest.fn(),
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  },
  createServiceLogger: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }))
}));

describe('Authentication Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    const validRegistrationData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'TestPassword123',
      initialLanguage: 'python'
    };

    it('should register a new user successfully', async () => {
      // Mock User.findOne to return null (user doesn't exist)
      MockedUser.findOne = jest.fn().mockResolvedValue(null);

      // Mock password hashing
      const { hashPassword, generateToken, generateSecureId } = require('@codementor/shared');
      hashPassword.mockResolvedValue('hashedPassword123');
      generateToken.mockReturnValue('jwt-token');
      generateSecureId.mockReturnValue('refresh-token');

      // Mock user creation
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

      MockedUser.mockImplementation(() => mockUser as any);

      const response = await request(app)
        .post('/api/auth/register')
        .send(validRegistrationData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('refreshToken');
    });

    it('should return 400 for invalid email', async () => {
      const invalidData = {
        ...validRegistrationData,
        email: 'invalid-email'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 for weak password', async () => {
      const invalidData = {
        ...validRegistrationData,
        password: '123' // Too weak
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 409 when user already exists', async () => {
      // Mock User.findOne to return existing user
      MockedUser.findOne = jest.fn().mockResolvedValue({
        email: 'test@example.com',
        username: 'testuser'
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send(validRegistrationData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('USER_EXISTS');
    });
  });

  describe('POST /api/auth/login', () => {
    const validLoginData = {
      email: 'test@example.com',
      password: 'TestPassword123'
    };

    it('should login successfully with valid credentials', async () => {
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

      const { verifyPassword, generateToken, generateSecureId } = require('@codementor/shared');
      verifyPassword.mockResolvedValue(true);
      generateToken.mockReturnValue('jwt-token');
      generateSecureId.mockReturnValue('refresh-token');

      const response = await request(app)
        .post('/api/auth/login')
        .send(validLoginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('refreshToken');
    });

    it('should return 401 for invalid credentials', async () => {
      MockedUser.findOne = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send(validLoginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
    });

    it('should return 400 for invalid email format', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'TestPassword123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 423 for locked account', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        isLocked: true
      };

      MockedUser.findOne = jest.fn().mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/auth/login')
        .send(validLoginData)
        .expect(423);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('ACCOUNT_LOCKED');
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh token successfully', async () => {
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

      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: 'valid-refresh-token' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('refreshToken');
    });

    it('should return 400 when refresh token is missing', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('MISSING_REFRESH_TOKEN');
    });

    it('should return 401 for invalid refresh token', async () => {
      MockedUser.findOne = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: 'invalid-refresh-token' })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('INVALID_REFRESH_TOKEN');
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return user profile when authenticated', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        username: 'testuser',
        toJSON: jest.fn().mockReturnValue({
          userId: 'user123',
          email: 'test@example.com',
          username: 'testuser'
        })
      };

      MockedUser.findById = jest.fn().mockResolvedValue(mockUser);

      const { verifyToken } = require('@codementor/shared');
      verifyToken.mockReturnValue({
        userId: 'user123',
        email: 'test@example.com',
        username: 'testuser'
      });

      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer valid-jwt-token')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('userId');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('MISSING_TOKEN');
    });
  });

  describe('POST /api/auth/assessment', () => {
    it('should perform knowledge assessment successfully', async () => {
      const mockUser = {
        _id: 'user123',
        progress: {},
        save: jest.fn().mockResolvedValue(true)
      };

      MockedUser.findById = jest.fn().mockResolvedValue(mockUser);

      const { verifyToken } = require('@codementor/shared');
      verifyToken.mockReturnValue({
        userId: 'user123',
        email: 'test@example.com',
        username: 'testuser'
      });

      const responses = [
        { correct: true },
        { correct: true },
        { correct: false },
        { correct: true },
        { correct: true }
      ];

      const response = await request(app)
        .post('/api/auth/assessment')
        .set('Authorization', 'Bearer valid-jwt-token')
        .send({ responses })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('assessmentScore');
      expect(response.body.data).toHaveProperty('recommendedLevel');
    });

    it('should return 400 for invalid responses', async () => {
      const { verifyToken } = require('@codementor/shared');
      verifyToken.mockReturnValue({
        userId: 'user123',
        email: 'test@example.com',
        username: 'testuser'
      });

      const response = await request(app)
        .post('/api/auth/assessment')
        .set('Authorization', 'Bearer valid-jwt-token')
        .send({ responses: 'invalid' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('INVALID_RESPONSES');
    });
  });

  describe('GET /api/auth/health', () => {
    it('should return healthy status', async () => {
      const response = await request(app)
        .get('/api/auth/health')
        .expect(200);

      expect(response.body.status).toBe('healthy');
      expect(response.body.service).toBe('auth-service');
    });
  });
});