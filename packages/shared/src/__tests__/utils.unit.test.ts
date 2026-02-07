import {
  detectLanguage,
  detectLanguageFromExtension,
  generateId,
  formatTimestamp,
  timeDiff,
  truncateText,
  countLines,
  extractCodeBlocks,
  sanitizeFilename,
  isValidJson,
  deepClone
} from '../utils';

describe('Utils - Unit Tests', () => {
  describe('detectLanguage', () => {
    it('should detect Python code', () => {
      expect(detectLanguage('def hello():\n    print("world")')).toBe('python');
      expect(detectLanguage('import os')).toBe('python');
      expect(detectLanguage('# Python comment')).toBe('python');
    });

    it('should detect JavaScript code', () => {
      expect(detectLanguage('function hello() { console.log("world"); }')).toBe('javascript');
      expect(detectLanguage('const x = 5;')).toBe('javascript');
      expect(detectLanguage('let y = () => {}')).toBe('javascript');
    });

    it('should detect Java code', () => {
      expect(detectLanguage('public class Test {}')).toBe('java');
      expect(detectLanguage('public static void main(String[] args)')).toBe('java');
      expect(detectLanguage('System.out.println("hello")')).toBe('java');
    });

    it('should detect C++ code', () => {
      expect(detectLanguage('#include <iostream>')).toBe('cpp');
      expect(detectLanguage('using namespace std;')).toBe('cpp');
      expect(detectLanguage('cout << "hello";')).toBe('cpp');
      expect(detectLanguage('int main() {')).toBe('cpp');
    });

    it('should detect HTML code', () => {
      expect(detectLanguage('<!DOCTYPE html>')).toBe('html');
      expect(detectLanguage('<html><body></body></html>')).toBe('html');
      expect(detectLanguage('<div>content</div>')).toBe('html');
    });

    it('should detect CSS code', () => {
      expect(detectLanguage('body { color: red; }')).toBe('css');
      expect(detectLanguage('.class { margin: 10px; }')).toBe('css');
      expect(detectLanguage('@media screen {}')).toBe('css');
    });

    it('should return null for unrecognized code', () => {
      expect(detectLanguage('some random text')).toBe(null);
      expect(detectLanguage('')).toBe(null);
    });
  });

  describe('detectLanguageFromExtension', () => {
    it('should detect language from file extensions', () => {
      expect(detectLanguageFromExtension('script.py')).toBe('python');
      expect(detectLanguageFromExtension('app.js')).toBe('javascript');
      expect(detectLanguageFromExtension('component.tsx')).toBe('javascript');
      expect(detectLanguageFromExtension('Main.java')).toBe('java');
      expect(detectLanguageFromExtension('program.cpp')).toBe('cpp');
      expect(detectLanguageFromExtension('page.html')).toBe('html');
      expect(detectLanguageFromExtension('styles.css')).toBe('css');
    });

    it('should return null for unknown extensions', () => {
      expect(detectLanguageFromExtension('file.txt')).toBe(null);
      expect(detectLanguageFromExtension('readme.md')).toBe(null);
      expect(detectLanguageFromExtension('noextension')).toBe(null);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(10);
    });
  });

  describe('formatTimestamp', () => {
    it('should format timestamp correctly', () => {
      const date = new Date('2023-12-01T10:30:45.123Z');
      const formatted = formatTimestamp(date);
      
      expect(formatted).toBe('2023-12-01 10:30:45');
    });
  });

  describe('timeDiff', () => {
    it('should calculate time difference', () => {
      const start = new Date('2023-12-01T10:00:00Z');
      const end = new Date('2023-12-01T10:00:05Z');
      
      expect(timeDiff(start, end)).toBe(5000); // 5 seconds in ms
    });

    it('should use current time as default end', () => {
      const start = new Date(Date.now() - 1000); // 1 second ago
      const diff = timeDiff(start);
      
      expect(diff).toBeGreaterThanOrEqual(1000);
      expect(diff).toBeLessThan(2000);
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated';
      const truncated = truncateText(longText, 20);
      
      expect(truncated).toBe('This is a very lo...');
      expect(truncated.length).toBe(20);
    });

    it('should not truncate short text', () => {
      const shortText = 'Short text';
      const result = truncateText(shortText, 20);
      
      expect(result).toBe(shortText);
    });
  });

  describe('countLines', () => {
    it('should count lines correctly', () => {
      expect(countLines('single line')).toBe(1);
      expect(countLines('line 1\nline 2')).toBe(2);
      expect(countLines('line 1\nline 2\nline 3')).toBe(3);
      expect(countLines('')).toBe(1);
    });
  });

  describe('extractCodeBlocks', () => {
    it('should extract code blocks from markdown', () => {
      const text = `
Some text
\`\`\`python
print("hello")
\`\`\`
More text
\`\`\`javascript
console.log("world");
\`\`\`
      `;
      
      const blocks = extractCodeBlocks(text);
      
      expect(blocks).toHaveLength(2);
      expect(blocks[0]).toEqual({
        code: 'print("hello")',
        language: 'python'
      });
      expect(blocks[1]).toEqual({
        code: 'console.log("world");',
        language: 'javascript'
      });
    });

    it('should handle code blocks without language', () => {
      const text = '```\nsome code\n```';
      const blocks = extractCodeBlocks(text);
      
      expect(blocks).toHaveLength(1);
      expect(blocks[0]).toEqual({
        code: 'some code',
        language: undefined
      });
    });
  });

  describe('sanitizeFilename', () => {
    it('should sanitize invalid characters', () => {
      const filename = 'my file<>:"/\\|?*.txt';
      const sanitized = sanitizeFilename(filename);
      
      expect(sanitized).toBe('my_file_________.txt');
    });

    it('should limit filename length', () => {
      const longFilename = 'a'.repeat(300) + '.txt';
      const sanitized = sanitizeFilename(longFilename);
      
      expect(sanitized.length).toBe(255);
    });
  });

  describe('isValidJson', () => {
    it('should validate JSON strings', () => {
      expect(isValidJson('{"key": "value"}')).toBe(true);
      expect(isValidJson('[1, 2, 3]')).toBe(true);
      expect(isValidJson('"string"')).toBe(true);
      expect(isValidJson('123')).toBe(true);
    });

    it('should reject invalid JSON', () => {
      expect(isValidJson('{key: value}')).toBe(false);
      expect(isValidJson('invalid')).toBe(false);
      expect(isValidJson('')).toBe(false);
    });
  });

  describe('deepClone', () => {
    it('should deep clone objects', () => {
      const original = {
        name: 'test',
        nested: {
          value: 42,
          array: [1, 2, 3]
        },
        date: new Date('2023-01-01')
      };
      
      const cloned = deepClone(original);
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.nested).not.toBe(original.nested);
      expect(cloned.nested.array).not.toBe(original.nested.array);
      expect(cloned.date).not.toBe(original.date);
    });

    it('should handle primitive values', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('string')).toBe('string');
      expect(deepClone(null)).toBe(null);
      expect(deepClone(undefined)).toBe(undefined);
    });
  });
});