// Test setup for API Gateway
import 'jest';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.LOG_LEVEL = 'error';

// Mock service URLs for testing
process.env.AUTH_SERVICE_URL = 'http://localhost:3002';
process.env.USER_PROFILE_SERVICE_URL = 'http://localhost:3003';
process.env.CODE_EXPLAINER_SERVICE_URL = 'http://localhost:3004';
process.env.ERROR_ANALYZER_SERVICE_URL = 'http://localhost:3005';
process.env.LANGUAGE_TUTOR_SERVICE_URL = 'http://localhost:3006';
process.env.LLM_SERVICE_URL = 'http://localhost:3007';

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