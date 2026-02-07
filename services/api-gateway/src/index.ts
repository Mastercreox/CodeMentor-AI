import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

import { logger, createServiceLogger } from '@codementor/shared';
import { API_CONFIG } from '@codementor/shared';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { authMiddleware } from './middleware/auth';
import { healthRouter } from './routes/health';

// Load environment variables
dotenv.config();

const app = express();
const serviceLogger = createServiceLogger('api-gateway');
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3001'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: API_CONFIG.RATE_LIMIT.WINDOW_MS,
  max: API_CONFIG.RATE_LIMIT.MAX_REQUESTS,
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later',
      statusCode: 429
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

// Body parsing and compression
app.use(compression());
app.use(express.json({ limit: API_CONFIG.MAX_REQUEST_SIZE }));
app.use(express.urlencoded({ extended: true, limit: API_CONFIG.MAX_REQUEST_SIZE }));

// Request logging
app.use(requestLogger);

// Health check endpoint
app.use('/health', healthRouter);

// Service proxy configurations
const serviceProxies = {
  '/api/v1/auth': {
    target: process.env.AUTH_SERVICE_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/auth': '' }
  },
  '/api/v1/users': {
    target: process.env.USER_PROFILE_SERVICE_URL || 'http://localhost:3003',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/users': '' },
    middleware: [authMiddleware]
  },
  '/api/v1/code': {
    target: process.env.CODE_EXPLAINER_SERVICE_URL || 'http://localhost:3004',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/code': '' },
    middleware: [authMiddleware]
  },
  '/api/v1/errors': {
    target: process.env.ERROR_ANALYZER_SERVICE_URL || 'http://localhost:3005',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/errors': '' },
    middleware: [authMiddleware]
  },
  '/api/v1/languages': {
    target: process.env.LANGUAGE_TUTOR_SERVICE_URL || 'http://localhost:3006',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/languages': '' },
    middleware: [authMiddleware]
  },
  '/api/v1/llm': {
    target: process.env.LLM_SERVICE_URL || 'http://localhost:3007',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/llm': '' },
    middleware: [authMiddleware]
  }
};

// Set up service proxies
Object.entries(serviceProxies).forEach(([path, config]) => {
  const { middleware = [], ...proxyConfig } = config;
  
  // Apply middleware before proxy
  if (middleware.length > 0) {
    app.use(path, ...middleware);
  }
  
  // Create proxy middleware
  const proxy = createProxyMiddleware({
    ...proxyConfig,
    timeout: API_CONFIG.TIMEOUT,
    onError: (err, req, res) => {
      serviceLogger.error('Proxy error', {
        path: req.path,
        target: proxyConfig.target,
        error: err.message
      });
      
      res.status(503).json({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'Service temporarily unavailable',
          statusCode: 503
        }
      });
    },
    onProxyReq: (proxyReq, req) => {
      serviceLogger.debug('Proxying request', {
        method: req.method,
        path: req.path,
        target: proxyConfig.target
      });
    }
  });
  
  app.use(path, proxy);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} not found`,
      statusCode: 404
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  serviceLogger.info(`API Gateway running on port ${PORT}`);
  serviceLogger.info('Service proxies configured:', Object.keys(serviceProxies));
});

export default app;