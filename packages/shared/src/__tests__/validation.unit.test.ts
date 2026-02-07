import {
  validateLanguage,
  validateUserLevel,
  sanitizeCode,
  sanitizeUserInput,
  codeSnippetSchema,
  errorAnalysisSchema
} from '../validation';

describe('Validation Utils - Unit Tests', () => {
  describe('validateLanguage', () => {
    it('should validate supported languages', () => {
      expect(validateLanguage('python')).toBe(true);
      expect(validateLanguage('javascript')).toBe(true);
      expect(validateLanguage('java')).toBe(true);
      expect(validateLanguage('cpp')).toBe(true);
      expect(validateLanguage('html')).toBe(true);
      expect(validateLanguage('css')).toBe(true);
    });

    it('should reject unsupported languages', () => {
      expect(validateLanguage('ruby')).toBe(false);
      expect(validateLanguage('go')).toBe(false);
      expect(validateLanguage('')).toBe(false);
      expect(validateLanguage('PYTHON')).toBe(false); // case sensitive
    });
  });

  describe('validateUserLevel', () => {
    it('should validate user levels', () => {
      expect(validateUserLevel('beginner')).toBe(true);
      expect(validateUserLevel('intermediate')).toBe(true);
      expect(validateUserLevel('advanced')).toBe(true);
    });

    it('should reject invalid user levels', () => {
      expect(validateUserLevel('expert')).toBe(false);
      expect(validateUserLevel('novice')).toBe(false);
      expect(validateUserLevel('')).toBe(false);
    });
  });

  describe('sanitizeCode', () => {
    it('should remove control characters', () => {
      const codeWithControlChars = 'print("hello")\x00\x08\x0B';
      const sanitized = sanitizeCode(codeWithControlChars);
      expect(sanitized).toBe('print("hello")');
    });

    it('should trim whitespace', () => {
      const codeWithWhitespace = '  \n  print("hello")  \n  ';
      const sanitized = sanitizeCode(codeWithWhitespace);
      expect(sanitized).toBe('print("hello")');
    });

    it('should preserve valid code structure', () => {
      const validCode = 'def greet(name):\n    return f"Hello, {name}!"';
      const sanitized = sanitizeCode(validCode);
      expect(sanitized).toBe(validCode);
    });
  });

  describe('sanitizeUserInput', () => {
    it('should remove HTML tags', () => {
      const inputWithTags = 'Hello <script>alert("xss")</script> World';
      const sanitized = sanitizeUserInput(inputWithTags);
      expect(sanitized).toBe('Hello script>alert("xss")/script World');
    });

    it('should limit input length', () => {
      const longInput = 'a'.repeat(2000);
      const sanitized = sanitizeUserInput(longInput);
      expect(sanitized.length).toBe(1000);
    });

    it('should trim whitespace', () => {
      const inputWithWhitespace = '  Hello World  ';
      const sanitized = sanitizeUserInput(inputWithWhitespace);
      expect(sanitized).toBe('Hello World');
    });
  });

  describe('codeSnippetSchema', () => {
    it('should validate valid code snippet', () => {
      const validSnippet = {
        code: 'print("hello")',
        language: 'python',
        userLevel: 'beginner'
      };
      
      const result = codeSnippetSchema.safeParse(validSnippet);
      expect(result.success).toBe(true);
    });

    it('should reject empty code', () => {
      const invalidSnippet = {
        code: '',
        language: 'python'
      };
      
      const result = codeSnippetSchema.safeParse(invalidSnippet);
      expect(result.success).toBe(false);
    });

    it('should reject unsupported language', () => {
      const invalidSnippet = {
        code: 'puts "hello"',
        language: 'ruby'
      };
      
      const result = codeSnippetSchema.safeParse(invalidSnippet);
      expect(result.success).toBe(false);
    });

    it('should default userLevel to beginner', () => {
      const snippet = {
        code: 'print("hello")',
        language: 'python'
      };
      
      const result = codeSnippetSchema.parse(snippet);
      expect(result.userLevel).toBe('beginner');
    });
  });

  describe('errorAnalysisSchema', () => {
    it('should validate valid error analysis request', () => {
      const validRequest = {
        errorMessage: 'NameError: name "x" is not defined',
        code: 'print(x)',
        language: 'python',
        userLevel: 'beginner'
      };
      
      const result = errorAnalysisSchema.safeParse(validRequest);
      expect(result.success).toBe(true);
    });

    it('should reject empty error message', () => {
      const invalidRequest = {
        errorMessage: '',
        code: 'print(x)',
        language: 'python'
      };
      
      const result = errorAnalysisSchema.safeParse(invalidRequest);
      expect(result.success).toBe(false);
    });
  });
});