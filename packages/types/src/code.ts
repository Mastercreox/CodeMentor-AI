/**
 * Supported programming languages in the CodeMentor AI platform
 */
export type SupportedLanguage = 'python' | 'javascript' | 'java' | 'cpp' | 'html' | 'css';

/**
 * Code snippet submitted for analysis
 */
export interface CodeSnippet {
  id: string;
  code: string;
  language: SupportedLanguage;
  submittedBy: string;
  timestamp: Date;
  explanation?: Explanation;
}

/**
 * Line-by-line explanation of code
 */
export interface LineExplanation {
  lineNumber: number;
  code: string;
  explanation: string;
  concepts: string[];
}

/**
 * Complete explanation of a code snippet
 */
export interface Explanation {
  id: string;
  overview: string;
  lineByLine: LineExplanation[];
  concepts: string[];
  suggestions: string[];
  difficulty: UserLevel;
  generatedAt: Date;
}

/**
 * Code example with explanation
 */
export interface CodeExample {
  code: string;
  explanation: string;
  output?: string;
  language: SupportedLanguage;
}

/**
 * User experience levels
 */
export type UserLevel = 'beginner' | 'intermediate' | 'advanced';