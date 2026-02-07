import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthToken } from '@codementor/types';

/**
 * JWT configuration
 */
export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'codementor-ai-secret-key',
  expiresIn: '24h',
  issuer: 'codementor-ai',
  audience: 'codementor-users'
};

/**
 * Password hashing configuration
 */
export const PASSWORD_CONFIG = {
  saltRounds: 12
};

/**
 * Generate JWT token for user
 */
export function generateToken(payload: Omit<AuthToken, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_CONFIG.secret, {
    expiresIn: JWT_CONFIG.expiresIn,
    issuer: JWT_CONFIG.issuer,
    audience: JWT_CONFIG.audience
  });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): AuthToken {
  try {
    const decoded = jwt.verify(token, JWT_CONFIG.secret, {
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience
    }) as AuthToken;
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Hash password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, PASSWORD_CONFIG.saltRounds);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7);
}

/**
 * Generate secure random string for session IDs
 */
export function generateSecureId(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}