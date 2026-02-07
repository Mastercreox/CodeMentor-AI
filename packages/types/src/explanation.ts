import { SupportedLanguage, UserLevel, CodeExample } from './code';

/**
 * Request for code explanation
 */
export interface ExplanationRequest {
  code: string;
  language: SupportedLanguage;
  userLevel: UserLevel;
  userId?: string;
  focusAreas?: string[];
}

/**
 * Response containing code explanation
 */
export interface ExplanationResponse {
  explanation: {
    overview: string;
    lineByLine: Array<{
      line: number;
      code: string;
      explanation: string;
    }>;
    concepts: string[];
    suggestions: string[];
  };
  metadata: {
    processingTime: number;
    confidence: number;
    language: SupportedLanguage;
    complexity: UserLevel;
  };
}

/**
 * Syntax highlighting information
 */
export interface SyntaxHighlight {
  startIndex: number;
  endIndex: number;
  tokenType: 'keyword' | 'string' | 'comment' | 'number' | 'operator' | 'identifier';
  value: string;
}

/**
 * Highlighted code with syntax information
 */
export interface HighlightedCode {
  code: string;
  language: SupportedLanguage;
  highlights: SyntaxHighlight[];
  lineCount: number;
}