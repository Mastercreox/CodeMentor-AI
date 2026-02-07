import { ApiError } from '@codementor/types';

/**
 * Base application error class
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  toApiError(): ApiError {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode
    };
  }
}

/**
 * Validation error
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR');
    if (details) {
      this.toApiError = () => ({
        code: this.code,
        message: this.message,
        statusCode: this.statusCode,
        details
      });
    }
  }
}

/**
 * Authentication error
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

/**
 * Authorization error
 */
export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

/**
 * Not found error
 */
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

/**
 * Rate limit error
 */
export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

/**
 * Service unavailable error
 */
export class ServiceUnavailableError extends AppError {
  constructor(service: string) {
    super(`${service} is currently unavailable`, 503, 'SERVICE_UNAVAILABLE');
  }
}

/**
 * Unsupported language error
 */
export class UnsupportedLanguageError extends AppError {
  constructor(language: string, supportedLanguages: string[]) {
    super(
      `Language '${language}' is not supported. Supported languages: ${supportedLanguages.join(', ')}`,
      400,
      'UNSUPPORTED_LANGUAGE'
    );
  }
}

/**
 * Code analysis error
 */
export class CodeAnalysisError extends AppError {
  constructor(message: string) {
    super(`Code analysis failed: ${message}`, 422, 'CODE_ANALYSIS_ERROR');
  }
}

/**
 * LLM service error
 */
export class LLMServiceError extends AppError {
  constructor(message: string) {
    super(`LLM service error: ${message}`, 502, 'LLM_SERVICE_ERROR');
  }
}

/**
 * Check if error is operational (expected) or programming error
 */
export function isOperationalError(error: Error): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

/**
 * Convert any error to API error format
 */
export function toApiError(error: Error): ApiError {
  if (error instanceof AppError) {
    return error.toApiError();
  }

  // Handle known error types
  if (error.name === 'ValidationError') {
    return {
      code: 'VALIDATION_ERROR',
      message: error.message,
      statusCode: 400
    };
  }

  if (error.name === 'CastError') {
    return {
      code: 'INVALID_ID',
      message: 'Invalid ID format',
      statusCode: 400
    };
  }

  // Default to internal server error
  return {
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred',
    statusCode: 500
  };
}