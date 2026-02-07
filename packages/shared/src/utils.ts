import { SupportedLanguage } from '@codementor/types';
import { LANGUAGE_EXTENSIONS } from './constants';

/**
 * Detect programming language from code content
 */
export function detectLanguage(code: string): SupportedLanguage | null {
  const trimmedCode = code.trim().toLowerCase();

  // Python detection
  if (
    trimmedCode.includes('def ') ||
    trimmedCode.includes('import ') ||
    trimmedCode.includes('print(') ||
    /^\s*#/.test(trimmedCode)
  ) {
    return 'python';
  }

  // JavaScript detection
  if (
    trimmedCode.includes('function ') ||
    trimmedCode.includes('const ') ||
    trimmedCode.includes('let ') ||
    trimmedCode.includes('console.log') ||
    trimmedCode.includes('=>')
  ) {
    return 'javascript';
  }

  // Java detection
  if (
    trimmedCode.includes('public class') ||
    trimmedCode.includes('public static void main') ||
    trimmedCode.includes('system.out.println')
  ) {
    return 'java';
  }

  // C++ detection
  if (
    trimmedCode.includes('#include') ||
    trimmedCode.includes('using namespace') ||
    trimmedCode.includes('cout <<') ||
    trimmedCode.includes('int main(')
  ) {
    return 'cpp';
  }

  // HTML detection
  if (
    trimmedCode.includes('<!doctype') ||
    trimmedCode.includes('<html') ||
    trimmedCode.includes('<body') ||
    /<[a-z]+[^>]*>/i.test(trimmedCode)
  ) {
    return 'html';
  }

  // CSS detection
  if (
    /[a-z-]+\s*:\s*[^;]+;/i.test(trimmedCode) ||
    /[.#][a-z-]+\s*{/i.test(trimmedCode) ||
    /@[a-z-]+/i.test(trimmedCode)
  ) {
    return 'css';
  }

  return null;
}

/**
 * Detect language from file extension
 */
export function detectLanguageFromExtension(filename: string): SupportedLanguage | null {
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  
  for (const [language, extensions] of Object.entries(LANGUAGE_EXTENSIONS)) {
    if (extensions.includes(extension)) {
      return language as SupportedLanguage;
    }
  }
  
  return null;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(date: Date): string {
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * Calculate time difference in milliseconds
 */
export function timeDiff(start: Date, end: Date = new Date()): number {
  return end.getTime() - start.getTime();
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Count lines in code
 */
export function countLines(code: string): number {
  return code.split('\n').length;
}

/**
 * Extract code blocks from text
 */
export function extractCodeBlocks(text: string): Array<{ code: string; language?: string }> {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks: Array<{ code: string; language?: string }> = [];
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    blocks.push({
      code: match[2].trim(),
      language: match[1] || undefined
    });
  }

  return blocks;
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 255);
}

/**
 * Check if string is valid JSON
 */
export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxAttempts) {
        throw lastError;
      }

      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}