// Code Explainer Service Entry Point
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import axios from 'axios';
import { logger, createServiceLogger } from '@codementor/shared';

const app = express();
const serviceLogger = createServiceLogger('code-explainer-service');
const PORT = process.env.PORT || 3004;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json());

const LLM_SERVICE_URL = process.env.LLM_SERVICE_URL || 'http://localhost:3007';

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'code-explainer-service',
    llmServiceUrl: LLM_SERVICE_URL
  });
});

// Explain code endpoint
app.post('/api/explain', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ 
        success: false,
        error: 'Code is required' 
      });
    }

    // Call LLM service
    const response = await axios.post(`${LLM_SERVICE_URL}/api/explain-code`, {
      code,
      language: language || 'javascript'
    });

    res.json({
      success: true,
      explanation: response.data.explanation,
      language: language || 'javascript',
      model: response.data.model
    });
  } catch (error: any) {
    serviceLogger.error('Error explaining code:', error);
    res.status(500).json({
      success: false,
      error: error.response?.data?.error || error.message || 'Failed to explain code'
    });
  }
});

// Start server
const server = app.listen(PORT, () => {
  serviceLogger.info(`Code Explainer Service running on port ${PORT}`);
  serviceLogger.info(`LLM Service URL: ${LLM_SERVICE_URL}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  serviceLogger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    serviceLogger.info('HTTP server closed');
  });
});

export default app;