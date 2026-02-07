import { SupportedLanguage, UserLevel } from './code';

/**
 * User profile information
 */
export interface UserProfile {
  userId: string;
  email: string;
  username: string;
  learningLevel: UserLevel;
  preferences: UserPreferences;
  progress: LearningProgress;
  interactionHistory: Interaction[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User preferences for content delivery
 */
export interface UserPreferences {
  explanationStyle: 'detailed' | 'concise' | 'visual';
  detailLevel: 'basic' | 'comprehensive';
  preferredLanguages: SupportedLanguage[];
  theme: 'light' | 'dark';
  notifications: boolean;
}

/**
 * Learning progress tracking
 */
export interface LearningProgress {
  completedModules: string[];
  currentLanguage: SupportedLanguage;
  streakDays: number;
  totalInteractions: number;
  lastActiveDate: Date;
  knowledgeAssessmentScore?: number;
}

/**
 * User interaction record
 */
export interface Interaction {
  id: string;
  type: InteractionType;
  content: any;
  timestamp: Date;
  rating?: number;
  tags: string[];
}

/**
 * Types of user interactions
 */
export type InteractionType = 'explanation' | 'error_analysis' | 'tutorial' | 'assessment';

/**
 * Authentication token payload
 */
export interface AuthToken {
  userId: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

/**
 * User registration request
 */
export interface UserRegistration {
  email: string;
  username: string;
  password: string;
  initialLanguage?: SupportedLanguage;
}

/**
 * User login request
 */
export interface UserLogin {
  email: string;
  password: string;
}