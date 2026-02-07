// Error Analyzer Service Entry Point
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import axios from 'axios';
import { logger, createServiceLogger } from '@codementor/shared';

const app = express();
const serviceLogger = createServiceLogger('error-analyzer-service');
const PORT = process.env.PORT || 3005;

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
    service: 'error-analyzer-service',
    llmServiceUrl: LLM_SERVICE_URL
  });
});

// Analyze error endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { error, language, code } = req.body;

    if (!error) {
      return res.status(400).json({ 
        success: false,
        error: 'Error message is required' 
      });
    }

    // Call LLM service
    const response = await axios.post(`${LLM_SERVICE_URL}/api/analyze-error`, {
      error,
      language: language || 'javascript',
      code
    });

    res.json({
      success: true,
      analysis: response.data.analysis,
      language: language || 'javascript',
      model: response.data.model
    });
  } catch (error: any) {
    serviceLogger.error('Error analyzing error:', error);
    res.status(500).json({
      success: false,
      error: error.response?.data?.error || error.message || 'Failed to analyze error'
    });
  }
});

// Start server
const server = app.listen(PORT, () => {
  serviceLogger.info(`Error Analyzer Service running on port ${PORT}`);
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