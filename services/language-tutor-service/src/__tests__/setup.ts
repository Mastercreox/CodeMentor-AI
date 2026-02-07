// Test setup configuration for language tutor service
import 'jest';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/codementor-tutor-test';
process.env.REDIS_URL = 'redis://localhost:6379/4';
process.env.LLM_SERVICE_URL = 'http://localhost:3007';
process.env.LOG_LEVEL = 'error';

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