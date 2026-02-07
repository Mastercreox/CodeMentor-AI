// Test setup configuration for auth service
import 'jest';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-for-auth-service';
process.env.MONGODB_URI = 'mongodb://localhost:27017/codementor-auth-test';
process.env.LOG_LEVEL = 'error';
process.env.BCRYPT_ROUNDS = '4'; // Lower rounds for faster tests

// Global test timeout
jest.setTimeout(10000);

// Mock console methods in tests to reduce noise
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};