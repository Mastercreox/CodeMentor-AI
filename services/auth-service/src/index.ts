import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger, createServiceLogger } from '@codementor/shared';
import { dbConnection } from './config/database';
import authRoutes from './routes/auth';

// Load environment variables
dotenv.config();

const app = express();
const serviceLogger = createServiceLogger('auth-service');
const PORT = process.env.PORT || 3002;

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  serviceLogger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  serviceLogger.error('Unhandled error:', error);
  
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
      statusCode: 500
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found',
      statusCode: 404
    }
  });
});

/**
 * Start the authentication service
 */
async function startServer() {
  try {
    // Connect to database
    await dbConnection.connect();
    
    // Start HTTP server
    const server = app.listen(PORT, () => {
      serviceLogger.info(`Authentication Service running on port ${PORT}`);
      serviceLogger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown handling
    const gracefulShutdown = async (signal: string) => {
      serviceLogger.info(`Received ${signal}. Starting graceful shutdown...`);
      
      server.close(async () => {
        serviceLogger.info('HTTP server closed');
        
        try {
          await dbConnection.disconnect();
          serviceLogger.info('Database connection closed');
          process.exit(0);
        } catch (error) {
          serviceLogger.error('Error during shutdown:', error);
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    serviceLogger.error('Failed to start authentication service:', error);
    process.exit(1);
  }
}

// Start the server
if (require.main === module) {
  startServer();
}

export default app;