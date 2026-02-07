// LLM Service Entry Point
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger, createServiceLogger } from '@codementor/shared';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const serviceLogger = createServiceLogger('llm-service');
const PORT = process.env.PORT || 3007;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json());

// Initialize Google AI
const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  serviceLogger.error('GOOGLE_AI_API_KEY is not set in environment variables');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL || 'gemini-pro' });

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'llm-service',
    apiKeyConfigured: !!apiKey
  });
});

// Generate text endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, maxTokens, temperature } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      text,
      model: process.env.AI_MODEL || 'gemini-pro'
    });
  } catch (error: any) {
    serviceLogger.error('Error generating text:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate text'
    });
  }
});

// Explain code endpoint
app.post('/api/explain-code', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const prompt = `You are a helpful programming tutor. Explain the following ${language || 'code'} in a clear, beginner-friendly way:

\`\`\`${language || ''}
${code}
\`\`\`

Provide:
1. What the code does (overview)
2. Line-by-line explanation
3. Key concepts used
4. Potential improvements`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const explanation = response.text();

    res.json({
      success: true,
      explanation,
      language,
      model: process.env.AI_MODEL || 'gemini-pro'
    });
  } catch (error: any) {
    serviceLogger.error('Error explaining code:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to explain code'
    });
  }
});

// Analyze error endpoint
app.post('/api/analyze-error', async (req, res) => {
  try {
    const { error, language, code } = req.body;

    if (!error) {
      return res.status(400).json({ error: 'Error message is required' });
    }

    const prompt = `You are a helpful programming tutor. Analyze this ${language || 'programming'} error and provide a beginner-friendly explanation:

Error: ${error}

${code ? `Code context:\n\`\`\`${language || ''}\n${code}\n\`\`\`` : ''}

Provide:
1. What the error means
2. Why it occurred
3. How to fix it
4. How to prevent it in the future`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    res.json({
      success: true,
      analysis,
      language,
      model: process.env.AI_MODEL || 'gemini-pro'
    });
  } catch (error: any) {
    serviceLogger.error('Error analyzing error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze error'
    });
  }
});

// Start server
const server = app.listen(PORT, () => {
  serviceLogger.info(`LLM Service running on port ${PORT}`);
  serviceLogger.info(`API Key configured: ${apiKey ? 'Yes' : 'No'}`);
  serviceLogger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  serviceLogger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    serviceLogger.info('HTTP server closed');
  });
});

export default app;