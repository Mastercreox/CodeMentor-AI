import { SupportedLanguage, UserLevel, CodeExample } from './code';

/**
 * Learning module structure
 */
export interface LearningModule {
  id: string;
  language: SupportedLanguage;
  title: string;
  description: string;
  difficulty: UserLevel;
  prerequisites: string[];
  topics: Topic[];
  exercises: Exercise[];
  estimatedDuration: number; // in minutes
  order: number;
}

/**
 * Learning topic within a module
 */
export interface Topic {
  id: string;
  title: string;
  explanation: string;
  codeExamples: CodeExample[];
  relatedConcepts: string[];
  keyPoints: string[];
}

/**
 * Practice exercise
 */
export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: UserLevel;
  prompt: string;
  starterCode?: string;
  expectedOutput?: string;
  hints: string[];
  solution: {
    code: string;
    explanation: string;
  };
}

/**
 * Learning path for a programming language
 */
export interface LearningPath {
  language: SupportedLanguage;
  modules: LearningModule[];
  totalDuration: number;
  description: string;
}

/**
 * Cross-language concept comparison
 */
export interface ConceptComparison {
  concept: string;
  description: string;
  comparisons: Array<{
    language: SupportedLanguage;
    syntax: string;
    example: string;
    notes?: string;
  }>;
}

/**
 * Syntax tutorial content
 */
export interface SyntaxTutorial {
  language: SupportedLanguage;
  sections: Array<{
    title: string;
    content: string;
    examples: CodeExample[];
  }>;
  basicSyntax: {
    variables: CodeExample[];
    functions: CodeExample[];
    conditionals: CodeExample[];
    loops: CodeExample[];
    dataTypes: CodeExample[];
  };
}

/**
 * Knowledge assessment question
 */
export interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'code_completion' | 'error_identification';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: UserLevel;
  language?: SupportedLanguage;
}

/**
 * Knowledge assessment result
 */
export interface AssessmentResult {
  userId: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number; // percentage
  suggestedLevel: UserLevel;
  weakAreas: string[];
  completedAt: Date;
}