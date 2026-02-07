import * as fc from 'fast-check';
import { AuthService } from '../../services/AuthService';
import { User } from '../../models/User';

// Mock dependencies
jest.mock('../../models/User');
jest.mock('@codementor/shared', () => ({
  ...jest.requireActual('@codementor/shared'),
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}));

const MockedUser = User as jest.Mocked<typeof User>;

describe('Property Tests: Knowledge Level Assessment', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  /**
   * **Property 13: Knowledge Level Assessment**
   * **Validates: Requirements 6.1**
   * 
   * For any new user registration, the system should include a knowledge level assessment 
   * that determines their programming experience level.
   */
  describe('Property 13: Knowledge Level Assessment', () => {
    // Generator for assessment responses
    const assessmentResponseGen = fc.array(
      fc.record({
        correct: fc.boolean(),
        questionId: fc.string(),
        answer: fc.string(),
        timeSpent: fc.integer({ min: 1, max: 300 }) // 1-300 seconds
      }),
      { minLength: 1, maxLength: 20 }
    );

    // Generator for user IDs
    const userIdGen = fc.string({ minLength: 1, maxLength: 50 });

    it('should always return a valid assessment result for any user and responses', async () => {
      await fc.assert(
        fc.asyncProperty(
          userIdGen,
          assessmentResponseGen,
          async (userId, responses) => {
            // Mock user exists
            const mockUser = {
              _id: userId,
              progress: {},
              learningLevel: 'beginner',
              save: jest.fn().mockResolvedValue(true)
            };

            MockedUser.findById = jest.fn().mockResolvedValue(mockUser);

            const result = await authService.performKnowledgeAssessment(userId, responses);

            // Property: Assessment should always succeed for valid inputs
            expect(result.success).toBe(true);
            
            // Property: Assessment score should be between 0 and 100
            expect(result.data?.assessmentScore).toBeGreaterThanOrEqual(0);
            expect(result.data?.assessmentScore).toBeLessThanOrEqual(100);
            
            // Property: Recommended level should be one of the valid levels
            expect(['beginner', 'intermediate', 'advanced']).toContain(result.data?.recommendedLevel);
            
            // Property: Assessment score should correlate with recommended level
            const score = result.data?.assessmentScore || 0;
            const level = result.data?.recommendedLevel;
            
            if (score >= 80) {
              expect(level).toBe('advanced');
            } else if (score >= 60) {
              expect(level).toBe('intermediate');
            } else {
              expect(level).toBe('beginner');
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should calculate assessment score correctly based on correct answers', async () => {
      await fc.assert(
        fc.asyncProperty(
          userIdGen,
          fc.array(fc.boolean(), { minLength: 1, maxLength: 10 }),
          async (userId, correctAnswers) => {
            // Mock user exists
            const mockUser = {
              _id: userId,
              progress: {},
              learningLevel: 'beginner',
              save: jest.fn().mockResolvedValue(true)
            };

            MockedUser.findById = jest.fn().mockResolvedValue(mockUser);

            // Create responses based on correct answers
            const responses = correctAnswers.map((correct, index) => ({
              correct,
              questionId: `q${index}`,
              answer: correct ? 'correct' : 'incorrect',
              timeSpent: 30
            }));

            const result = await authService.performKnowledgeAssessment(userId, responses);

            // Property: Score should match the percentage of correct answers
            const expectedScore = Math.round((correctAnswers.filter(Boolean).length / correctAnswers.length) * 100);
            expect(result.data?.assessmentScore).toBe(expectedScore);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should handle edge cases gracefully', async () => {
      await fc.assert(
        fc.asyncProperty(
          userIdGen,
          fc.oneof(
            fc.constant([]), // Empty responses
            fc.array(fc.record({ correct: fc.boolean() }), { minLength: 1, maxLength: 1 }), // Single response
            fc.array(fc.record({ correct: fc.constant(true) }), { minLength: 5, maxLength: 5 }), // All correct
            fc.array(fc.record({ correct: fc.constant(false) }), { minLength: 5, maxLength: 5 }) // All incorrect
          ),
          async (userId, responses) => {
            // Mock user exists
            const mockUser = {
              _id: userId,
              progress: {},
              learningLevel: 'beginner',
              save: jest.fn().mockResolvedValue(true)
            };

            MockedUser.findById = jest.fn().mockResolvedValue(mockUser);

            const result = await authService.performKnowledgeAssessment(userId, responses);

            if (responses.length === 0) {
              // Property: Empty responses should result in 0 score and beginner level
              expect(result.data?.assessmentScore).toBe(0);
              expect(result.data?.recommendedLevel).toBe('beginner');
            } else {
              // Property: Non-empty responses should always produce valid results
              expect(result.success).toBe(true);
              expect(result.data?.assessmentScore).toBeGreaterThanOrEqual(0);
              expect(result.data?.assessmentScore).toBeLessThanOrEqual(100);
              expect(['beginner', 'intermediate', 'advanced']).toContain(result.data?.recommendedLevel);
            }
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should fail gracefully for non-existent users', async () => {
      await fc.assert(
        fc.asyncProperty(
          userIdGen,
          assessmentResponseGen,
          async (userId, responses) => {
            // Mock user doesn't exist
            MockedUser.findById = jest.fn().mockResolvedValue(null);

            const result = await authService.performKnowledgeAssessment(userId, responses);

            // Property: Should always fail gracefully for non-existent users
            expect(result.success).toBe(false);
            expect(result.error?.code).toBe('USER_NOT_FOUND');
            expect(result.error?.statusCode).toBe(404);
          }
        ),
        { numRuns: 20 }
      );
    });

    it('should maintain consistency across multiple assessments for the same user', async () => {
      await fc.assert(
        fc.asyncProperty(
          userIdGen,
          fc.array(fc.boolean(), { minLength: 5, maxLength: 5 }),
          async (userId, correctAnswers) => {
            // Mock user exists
            const mockUser = {
              _id: userId,
              progress: {},
              learningLevel: 'beginner',
              save: jest.fn().mockResolvedValue(true)
            };

            MockedUser.findById = jest.fn().mockResolvedValue(mockUser);

            // Create identical responses
            const responses = correctAnswers.map((correct, index) => ({
              correct,
              questionId: `q${index}`,
              answer: correct ? 'correct' : 'incorrect',
              timeSpent: 30
            }));

            // Run assessment twice with identical responses
            const result1 = await authService.performKnowledgeAssessment(userId, responses);
            const result2 = await authService.performKnowledgeAssessment(userId, responses);

            // Property: Identical inputs should produce identical results
            expect(result1.data?.assessmentScore).toBe(result2.data?.assessmentScore);
            expect(result1.data?.recommendedLevel).toBe(result2.data?.recommendedLevel);
          }
        ),
        { numRuns: 25 }
      );
    });

    it('should update user profile with assessment results', async () => {
      await fc.assert(
        fc.asyncProperty(
          userIdGen,
          assessmentResponseGen,
          async (userId, responses) => {
            // Mock user exists
            const mockUser = {
              _id: userId,
              progress: {},
              learningLevel: 'beginner',
              save: jest.fn().mockResolvedValue(true)
            };

            MockedUser.findById = jest.fn().mockResolvedValue(mockUser);

            const result = await authService.performKnowledgeAssessment(userId, responses);

            if (result.success) {
              // Property: User profile should be updated with assessment results
              expect(mockUser.progress.knowledgeAssessmentScore).toBe(result.data?.assessmentScore);
              expect(mockUser.learningLevel).toBe(result.data?.recommendedLevel);
              expect(mockUser.save).toHaveBeenCalled();
            }
          }
        ),
        { numRuns: 30 }
      );
    });
  });
});