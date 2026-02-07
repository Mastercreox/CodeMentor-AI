import { SupportedLanguage } from '@codementor/types';

/**
 * Supported programming languages
 */
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  'python',
  'javascript', 
  'java',
  'cpp',
  'html',
  'css'
];

/**
 * Language display names
 */
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  java: 'Java',
  cpp: 'C++',
  html: 'HTML',
  css: 'CSS'
};

/**
 * File extensions for each language
 */
export const LANGUAGE_EXTENSIONS: Record<SupportedLanguage, string[]> = {
  python: ['.py'],
  javascript: ['.js', '.jsx', '.ts', '.tsx'],
  java: ['.java'],
  cpp: ['.cpp', '.cc', '.cxx', '.c++', '.hpp', '.h'],
  html: ['.html', '.htm'],
  css: ['.css']
};

/**
 * Default code examples for each language
 */
export const DEFAULT_CODE_EXAMPLES: Record<SupportedLanguage, string> = {
  python: `# Hello World in Python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,

  javascript: `// Hello World in JavaScript
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,

  java: `// Hello World in Java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,

  cpp: `// Hello World in C++
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

  html: `<!-- Hello World in HTML -->
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,

  css: `/* Hello World styling in CSS */
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    margin-top: 50px;
}`
};

/**
 * API configuration constants
 */
export const API_CONFIG = {
  VERSION: 'v1',
  BASE_PATH: '/api/v1',
  TIMEOUT: 30000, // 30 seconds
  MAX_REQUEST_SIZE: '10mb',
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100
  }
};

/**
 * Response time requirements (in milliseconds)
 */
export const RESPONSE_TIME_LIMITS = {
  CODE_EXPLANATION: 5000,
  ERROR_ANALYSIS: 5000,
  TUTORIAL_CONTENT: 3000,
  USER_PROFILE: 1000,
  AUTHENTICATION: 2000
};

/**
 * Content limits
 */
export const CONTENT_LIMITS = {
  MAX_CODE_LENGTH: 10000,
  MAX_ERROR_MESSAGE_LENGTH: 2000,
  MAX_EXPLANATION_LENGTH: 5000,
  MAX_USERNAME_LENGTH: 30,
  MIN_USERNAME_LENGTH: 3,
  MIN_PASSWORD_LENGTH: 8
};

/**
 * Cache configuration
 */
export const CACHE_CONFIG = {
  TTL: {
    CODE_EXPLANATION: 3600, // 1 hour
    ERROR_ANALYSIS: 3600, // 1 hour
    TUTORIAL_CONTENT: 86400, // 24 hours
    USER_PROFILE: 1800 // 30 minutes
  }
};

/**
 * Database configuration
 */
export const DB_CONFIG = {
  CONNECTION_TIMEOUT: 10000,
  QUERY_TIMEOUT: 30000,
  MAX_CONNECTIONS: 20
};

/**
 * Common error messages
 */
export const ERROR_MESSAGES = {
  INVALID_CODE: 'Invalid or empty code provided',
  UNSUPPORTED_LANGUAGE: 'Programming language not supported',
  AUTHENTICATION_REQUIRED: 'Authentication required',
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: 'Email already registered',
  USERNAME_ALREADY_EXISTS: 'Username already taken',
  RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later',
  SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
  INTERNAL_ERROR: 'An unexpected error occurred'
};