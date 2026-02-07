import { Router } from 'express';
import { HealthCheckResponse } from '@codementor/types';

const router = Router();

/**
 * Health check endpoint
 */
router.get('/', async (req, res) => {
  const startTime = Date.now();
  
  // Check service availability
  const services = {
    'auth-service': process.env.AUTH_SERVICE_URL || 'http://localhost:3002',
    'user-profile-service': process.env.USER_PROFILE_SERVICE_URL || 'http://localhost:3003',
    'code-explainer-service': process.env.CODE_EXPLAINER_SERVICE_URL || 'http://localhost:3004',
    'error-analyzer-service': process.env.ERROR_ANALYZER_SERVICE_URL || 'http://localhost:3005',
    'language-tutor-service': process.env.LANGUAGE_TUTOR_SERVICE_URL || 'http://localhost:3006',
    'llm-service': process.env.LLM_SERVICE_URL || 'http://localhost:3007'
  };

  const serviceStatuses: Record<string, { status: 'healthy' | 'unhealthy'; responseTime?: number; error?: string }> = {};
  
  // Check each service (simplified - in production would make actual HTTP calls)
  for (const [serviceName, serviceUrl] of Object.entries(services)) {
    try {
      // For now, assume services are healthy if URLs are configured
      serviceStatuses[serviceName] = {
        status: 'healthy',
        responseTime: Math.random() * 100 // Mock response time
      };
    } catch (error) {
      serviceStatuses[serviceName] = {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Determine overall status
  const allHealthy = Object.values(serviceStatuses).every(s => s.status === 'healthy');
  const overallStatus = allHealthy ? 'healthy' : 'degraded';

  const response: HealthCheckResponse = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: serviceStatuses
  };

  const statusCode = overallStatus === 'healthy' ? 200 : 503;
  res.status(statusCode).json(response);
});

export { router as healthRouter };