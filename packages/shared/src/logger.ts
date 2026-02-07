import winston from 'winston';

/**
 * Logger configuration
 */
const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'codementor-ai' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
};

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
  loggerConfig.transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
}

/**
 * Application logger instance
 */
export const logger = winston.createLogger(loggerConfig);

/**
 * Create service-specific logger
 */
export function createServiceLogger(serviceName: string) {
  return logger.child({ service: serviceName });
}

/**
 * Log request/response for API endpoints
 */
export function logApiCall(
  method: string,
  path: string,
  statusCode: number,
  responseTime: number,
  userId?: string
) {
  logger.info('API Call', {
    method,
    path,
    statusCode,
    responseTime,
    userId,
    type: 'api_call'
  });
}

/**
 * Log user interaction
 */
export function logUserInteraction(
  userId: string,
  interactionType: string,
  details: any
) {
  logger.info('User Interaction', {
    userId,
    interactionType,
    details,
    type: 'user_interaction'
  });
}

/**
 * Log error with context
 */
export function logError(
  error: Error,
  context: {
    userId?: string;
    service?: string;
    operation?: string;
    additionalInfo?: any;
  }
) {
  logger.error('Application Error', {
    message: error.message,
    stack: error.stack,
    ...context,
    type: 'error'
  });
}