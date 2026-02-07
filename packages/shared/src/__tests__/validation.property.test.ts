import * as fc from 'fast-check';
import {
  validateLanguage,
  validateUserLevel,
  sanitizeCode,
  sanitizeUserInput,
  supportedLanguageSchema,
  userLevelSchema
} from '../validation';
import { SUPPORTED_LANGUAGES } from '../constants';

describe('Validation Utils - Property Tests', () => {
  describe('Language validation properties', () => {
    it('should always accept supported languages', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...SUPPORTED_LANGUAGES),
          (language) => {
            expect(validateLanguage(language)).toBe(true);
            expect(supportedLanguageSchema.safeParse(language).success).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject any string not in supported languages', () => {
      fc.assert(
        fc.property(
          fc.string().filter(s => !SUPPORTED_LANGUAGES.includes(s as any)),
          (language) => {
            expect(validateLanguage(language)).toBe(false);
            expect(supportedLanguageSchema.safeParse(language).success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('User level validation properties', () => {
    const validLevels = ['beginner', 'intermediate', 'advanced'];

    it('should always accept valid user levels', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...validLevels),
          (level) => {
            expect(validateUserLevel(level)).toBe(true);
            expect(userLevelSchema.safeParse(level).success).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject any string not in valid levels', () => {
      fc.assert(
        fc.property(
          fc.string().filter(s => !validLevels.includes(s)),
          (level) => {
            expect(validateUserLevel(level)).toBe(false);
            expect(userLevelSchema.safeParse(level).success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Code sanitization properties', () => {
    it('should never return longer string than input after sanitization', () => {
      fc.assert(
        fc.property(
          fc.string(),
          (code) => {
            const sanitized = sanitizeCode(code);
            expect(sanitized.length).toBeLessThanOrEqual(code.length);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should remove all control characters', () => {
      fc.assert(
        fc.property(
          fc.string(),
          (code) => {
            const sanitized = sanitizeCode(code);
            // Check that no control characters remain (except newlines and tabs which are preserved)
            const hasControlChars = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(sanitized);
            expect(hasControlChars).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should preserve valid code characters', () => {
      const validCodeChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[].,;:"\'\\n\\t ';
      
      fc.assert(
        fc.property(
          fc.stringOf(fc.constantFrom(...validCodeChars.split(''))),
          (code) => {
            const sanitized = sanitizeCode(code);
            // All characters should be preserved (except leading/trailing whitespace)
            expect(sanitized).toBe(code.trim());
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('User input sanitization properties', () => {
    it('should always limit output to 1000 characters or less', () => {
      fc.assert(
        fc.property(
          fc.string(),
          (input) => {
            const sanitized = sanitizeUserInput(input);
            expect(sanitized.length).toBeLessThanOrEqual(1000);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should never contain angle brackets after sanitization', () => {
      fc.assert(
        fc.property(
          fc.string(),
          (input) => {
            const sanitized = sanitizeUserInput(input);
            expect(sanitized).not.toContain('<');
            expect(sanitized).not.toContain('>');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should preserve safe characters', () => {
      const safeChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,;:"\'()[]{}';
      
      fc.assert(
        fc.property(
          fc.stringOf(fc.constantFrom(...safeChars.split('')), { maxLength: 500 }),
          (input) => {
            const sanitized = sanitizeUserInput(input);
            expect(sanitized).toBe(input.trim());
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});