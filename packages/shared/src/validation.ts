import { z } from 'zod';
import { SupportedLanguage, UserLevel } from '@codementor/types';

/**
 * Supported languages validation schema
 */
export const supportedLanguageSchema = z.enum(['python', 'javascript', 'java', 'cpp', 'html', 'css']);

/**
 * User level validation schema
 */
export const userLevelSchema = z.enum(['beginner', 'intermediate', 'advanced']);

/**
 * Code snippet validation schema
 */
export const codeSnippetSchema = z.object({
  code: z.string().min(1, 'Code cannot be empty').max(10000, 'Code too long'),
  language: supportedLanguageSchema,
  userLevel: userLevelSchema.optional().default('beginner')
});

/**
 * Error analysis request validation schema
 */
export const errorAnalysisSchema = z.object({
  errorMessage: z.string().min(1, 'Error message cannot be empty'),
  code: z.string().min(1, 'Code cannot be empty'),
  language: supportedLanguageSchema,
  userLevel: userLevelSchema.optional().default('beginner')
});

/**
 * User registration validation schema
 */
export const userRegistrationSchema = z.object({
  email: z.string().email('Invalid email format'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username too long'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  initialLanguage: supportedLanguageSchema.optional()
});

/**
 * User login validation schema
 */
export const userLoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

/**
 * Pagination validation schema
 */
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
});

/**
 * Search validation schema
 */
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query cannot be empty'),
  filters: z.record(z.any()).optional(),
  pagination: paginationSchema.optional()
});

/**
 * Validate supported language
 */
export function validateLanguage(language: string): language is SupportedLanguage {
  return supportedLanguageSchema.safeParse(language).success;
}

/**
 * Validate user level
 */
export function validateUserLevel(level: string): level is UserLevel {
  return userLevelSchema.safeParse(level).success;
}

/**
 * Sanitize code input
 */
export function sanitizeCode(code: string): string {
  // Remove potentially dangerous patterns while preserving code structure
  return code
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
    .trim();
}

/**
 * Validate and sanitize user input
 */
export function sanitizeUserInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 1000); // Limit length
}