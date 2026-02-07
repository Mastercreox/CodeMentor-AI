import mongoose, { Document, Schema } from 'mongoose';
import { UserProfile, UserPreferences, LearningProgress, Interaction, SupportedLanguage, UserLevel } from '@codementor/types';

/**
 * User document interface extending UserProfile
 */
export interface UserDocument extends Omit<UserProfile, 'userId'>, Document {
  _id: string;
  passwordHash: string;
  refreshTokens: string[];
  emailVerified: boolean;
  lastLoginAt?: Date;
  loginAttempts: number;
  lockUntil?: Date;
}

/**
 * User preferences schema
 */
const userPreferencesSchema = new Schema<UserPreferences>({
  explanationStyle: {
    type: String,
    enum: ['detailed', 'concise', 'visual'],
    default: 'detailed'
  },
  detailLevel: {
    type: String,
    enum: ['basic', 'comprehensive'],
    default: 'basic'
  },
  preferredLanguages: [{
    type: String,
    enum: ['python', 'javascript', 'java', 'cpp', 'html', 'css']
  }],
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },
  notifications: {
    type: Boolean,
    default: true
  }
}, { _id: false });

/**
 * Learning progress schema
 */
const learningProgressSchema = new Schema<LearningProgress>({
  completedModules: [String],
  currentLanguage: {
    type: String,
    enum: ['python', 'javascript', 'java', 'cpp', 'html', 'css'],
    default: 'python'
  },
  streakDays: {
    type: Number,
    default: 0
  },
  totalInteractions: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date,
    default: Date.now
  },
  knowledgeAssessmentScore: Number
}, { _id: false });

/**
 * Interaction schema
 */
const interactionSchema = new Schema<Interaction>({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['explanation', 'error_analysis', 'tutorial', 'assessment'],
    required: true
  },
  content: Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  tags: [String]
}, { _id: false });

/**
 * User schema
 */
const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    match: [/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens']
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 6
  },
  learningLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  preferences: {
    type: userPreferencesSchema,
    default: () => ({})
  },
  progress: {
    type: learningProgressSchema,
    default: () => ({})
  },
  interactionHistory: [interactionSchema],
  refreshTokens: [String],
  emailVerified: {
    type: Boolean,
    default: false
  },
  lastLoginAt: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.userId = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.passwordHash;
      delete ret.refreshTokens;
      delete ret.loginAttempts;
      delete ret.lockUntil;
      return ret;
    }
  }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ 'interactionHistory.timestamp': -1 });

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > new Date());
});

// Pre-save middleware to handle failed login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < new Date()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates: any = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

export const User = mongoose.model<UserDocument>('User', userSchema);