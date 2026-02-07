import { SupportedLanguage, UserLevel } from './code';

/**
 * Error analysis request
 */
export interface ErrorAnalysisRequest {
  errorMessage: string;
  code: string;
  language: SupportedLanguage;
  userLevel: UserLevel;
  userId?: string;
}

/**
 * Error analysis response
 */
export interface ErrorAnalysisResponse {
  analysis: {
    errorType: string;
    explanation: string;
    fixSteps: string[];
    correctedCode?: string;
    educationalContext: string;
  };
  metadata: {
    processingTime: number;
    confidence: number;
    commonMistake: boolean;
    severity: ErrorSeverity;
  };
}

/**
 * Error severity levels
 */
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Classified error information
 */
export interface ErrorAnalysis {
  id: string;
  errorMessage: string;
  errorType: string;
  explanation: string;
  fixSteps: string[];
  correctedCode?: string;
  educationalContext: string;
  commonMistake: boolean;
  severity: ErrorSeverity;
  language: SupportedLanguage;
  createdAt: Date;
}

/**
 * Common error patterns for beginners
 */
export interface CommonError {
  id: string;
  errorPattern: string;
  language: SupportedLanguage;
  description: string;
  commonCauses: string[];
  preventionTips: string[];
  examples: Array<{
    incorrectCode: string;
    correctedCode: string;
    explanation: string;
  }>;
}