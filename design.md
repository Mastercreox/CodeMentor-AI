# Design Document - CodeMentor AI

## Overview

CodeMentor AI is a production-ready, full-stack educational platform that provides AI-powered code explanations and error analysis for beginner programmers. The system uses a microservices architecture with React frontend, Node.js/TypeScript backend services, and Google Generative AI (Gemini Pro) for intelligent content generation.

**Architecture:** Microservices  
**Frontend:** React + TypeScript (Vercel)  
**Backend:** Node.js + Express + TypeScript (Railway)  
**AI Provider:** Google Generative AI (Gemini Pro)  
**Database:** MongoDB + Redis  
**Authentication:** JWT  
**Status:** ✅ Production Ready

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Internet Users                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Frontend (Vercel)                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         React Web Client (Port 8080)                 │  │
│  │  - HomePage, Dashboard, Code Explainer              │  │
│  │  - Error Analyzer, Learning Paths, Profile          │  │
│  │  - Voice Assistant, Auto Language Detection         │  │
│  │  - Demo Mode Support                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS/REST
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                Backend Services (Railway)                   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         API Gateway (Port 3000)                      │  │
│  │  - Request routing                                   │  │
│  │  - CORS & Security                                   │  │
│  │  - Rate limiting                                     │  │
│  └─────────┬────────────────────────────────────────────┘  │
│            │                                                │
│  ┌─────────┴──────────┬──────────────┬──────────────────┐  │
│  │                    │              │                  │  │
│  ▼                    ▼              ▼                  ▼  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Auth    │  │   Code   │  │  Error   │  │   User   │  │
│  │ Service  │  │Explainer │  │ Analyzer │  │ Profile  │  │
│  │ (3002)   │  │  (3004)  │  │  (3005)  │  │  (3003)  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │              │             │        │
│       │             └──────┬───────┘             │        │
│       │                    │                     │        │
│       │                    ▼                     │        │
│       │            ┌──────────────┐              │        │
│       │            │ LLM Service  │              │        │
│       │            │   (3007)     │              │        │
│       │            │              │              │        │
│       │            │ Google AI    │              │        │
│       │            │ Integration  │              │        │
│       │            └──────────────┘              │        │
│       │                                          │        │
│       ▼                                          ▼        │
│  ┌──────────────────────────────────────────────────┐    │
│  │         Data Layer                               │    │
│  │  ┌──────────┐              ┌──────────┐         │    │
│  │  │ MongoDB  │              │  Redis   │         │    │
│  │  │ (Users,  │              │ (Cache)  │         │    │
│  │  │ History) │              │          │         │    │
│  │  └──────────┘              └──────────┘         │    │
│  └──────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              External Services                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │     Google Generative AI (Gemini Pro)                │  │
│  │     - Code explanation generation                    │  │
│  │     - Error analysis generation                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Design

### 1. Frontend - Web Client

**Technology:** React 18 + TypeScript + React Router  
**Deployment:** Vercel  
**Port:** 8080 (local), HTTPS (production)

#### Pages

**1.1 HomePage**
- Hero section with call-to-action
- Feature highlights
- Navigation to registration/login
- Responsive design

**1.2 LoginPage**
- Email/username + password form
- Support for demo credentials
- Demo mode fallback
- Error handling

**1.3 RegisterPage**
- Email, username, password, knowledge level
- Form validation
- Demo mode support
- Success redirect to dashboard

**1.4 DashboardPage**
- Welcome message with user name
- Quick access cards to features
- Recent activity summary
- Demo mode indicator

**1.5 CodeExplainerPage**
- Code input textarea (syntax highlighted)
- Language selector with auto-detection
- "Explain Code" button
- Explanation display area
- Voice assistant button (🔊 Listen)
- Demo mode with pre-configured examples

**1.6 ErrorAnalyzerPage**
- Error message input
- Optional code context input
- Language selector with auto-detection
- "Analyze Error" button
- Analysis display area
- Voice assistant button
- Demo mode with common errors

**1.7 LearningPathPage**
- List of supported languages
- Learning path cards
- Progress tracking
- Resource links

**1.8 ProfilePage**
- User information display
- Edit profile form
- Preferences management
- Account settings

**1.9 AboutPage**
- Mission statement
- Feature overview
- Development team info
- Technology stack
- Impact statistics

#### Components

**AuthContext**
```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, knowledgeLevel?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

**Features:**
- JWT token management
- Demo mode fallback
- LocalStorage persistence
- Axios interceptors

**ThemeContext**
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

**Layout Components**
- Header: Navigation, user menu, theme toggle
- Footer: Links, copyright, social media
- PrivateRoute: Authentication guard

#### Voice Assistant Implementation

```typescript
const speakText = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(cleanText(text));
  utterance.rate = 0.80;  // Slower for clarity
  utterance.pitch = 1.3;   // Higher for pleasant tone
  utterance.volume = 0.95; // Slightly reduced
  
  // Select female voice
  const voices = speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => 
    v.name.includes('Zira') || 
    v.name.includes('Samantha') || 
    v.name.includes('Female')
  );
  
  if (femaleVoice) utterance.voice = femaleVoice;
  speechSynthesis.speak(utterance);
};
```

#### Auto Language Detection

```typescript
const detectLanguage = (code: string): string => {
  // JavaScript detection
  if (/\b(function|const|let|var|=>|console\.log)\b/.test(code)) {
    return 'javascript';
  }
  
  // Python detection
  if (/\b(def|import|print|class|if __name__)\b/.test(code)) {
    return 'python';
  }
  
  // Java detection
  if (/\b(public|private|class|static|void)\b/.test(code)) {
    return 'java';
  }
  
  // C++ detection
  if (/#include|std::|cout|cin/.test(code)) {
    return 'cpp';
  }
  
  // HTML detection
  if (/<[a-z][\s\S]*>/i.test(code)) {
    return 'html';
  }
  
  // CSS detection
  if (/[.#][\w-]+\s*\{[\s\S]*\}/.test(code)) {
    return 'css';
  }
  
  return 'javascript'; // default
};
```

---

### 2. Backend Services

#### 2.1 API Gateway

**Port:** 3000  
**Responsibility:** Request routing, CORS, security

**Endpoints:**
```
GET  /health
POST /api/v1/auth/*          → Auth Service
POST /api/v1/code/explain    → Code Explainer Service
POST /api/v1/error/analyze   → Error Analyzer Service
GET  /api/v1/profile/*       → User Profile Service
```

**Middleware:**
- Helmet (security headers)
- CORS (cross-origin requests)
- Rate limiting (60 req/min)
- Request logging
- Error handling

**Implementation:**
```typescript
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));
app.use(express.json());

// Route to services
app.use('/api/v1/auth', authServiceProxy);
app.use('/api/v1/code', codeExplainerProxy);
app.use('/api/v1/error', errorAnalyzerProxy);
```

#### 2.2 LLM Service

**Port:** 3007  
**Responsibility:** Google AI integration

**Technology:** Google Generative AI SDK  
**Model:** gemini-pro

**Endpoints:**
```
GET  /health
POST /api/generate          - General text generation
POST /api/explain-code      - Code explanation
POST /api/analyze-error     - Error analysis
```

**Implementation:**
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

app.post('/api/explain-code', async (req, res) => {
  const { code, language } = req.body;
  
  const prompt = `You are a helpful programming tutor. Explain the following ${language} code in a clear, beginner-friendly way:

\`\`\`${language}
${code}
\`\`\`

Provide:
1. What the code does (overview)
2. Line-by-line explanation
3. Key concepts used
4. Potential improvements`;

  const result = await model.generateContent(prompt);
  const explanation = result.response.text();
  
  res.json({ success: true, explanation, language });
});
```

**Environment Variables:**
```env
GOOGLE_AI_API_KEY=AIzaSyD2L_EYXqdpXux3lC0kqVUOB0PlW21QUlM
AI_MODEL=gemini-pro
AI_MAX_TOKENS=2000
AI_TEMPERATURE=0.7
```

#### 2.3 Code Explainer Service

**Port:** 3004  
**Responsibility:** Code explanation orchestration

**Endpoints:**
```
GET  /health
POST /api/explain
```

**Request:**
```json
{
  "code": "function hello() { console.log('Hello'); }",
  "language": "javascript"
}
```

**Response:**
```json
{
  "success": true,
  "explanation": "This code defines a function...",
  "language": "javascript",
  "model": "gemini-pro"
}
```

**Implementation:**
```typescript
app.post('/api/explain', async (req, res) => {
  const { code, language } = req.body;
  
  // Validate input
  if (!code) {
    return res.status(400).json({ 
      success: false, 
      error: 'Code is required' 
    });
  }
  
  // Call LLM Service
  const response = await axios.post(
    `${LLM_SERVICE_URL}/api/explain-code`,
    { code, language }
  );
  
  res.json(response.data);
});
```

#### 2.4 Error Analyzer Service

**Port:** 3005  
**Responsibility:** Error analysis orchestration

**Endpoints:**
```
GET  /health
POST /api/analyze
```

**Request:**
```json
{
  "error": "TypeError: Cannot read property 'name' of undefined",
  "language": "javascript",
  "code": "const user = null; console.log(user.name);"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": "This error occurs when...",
  "language": "javascript",
  "model": "gemini-pro"
}
```

**Implementation:**
```typescript
app.post('/api/analyze', async (req, res) => {
  const { error, language, code } = req.body;
  
  if (!error) {
    return res.status(400).json({ 
      success: false, 
      error: 'Error message is required' 
    });
  }
  
  const response = await axios.post(
    `${LLM_SERVICE_URL}/api/analyze-error`,
    { error, language, code }
  );
  
  res.json(response.data);
});
```

#### 2.5 Auth Service

**Port:** 3002  
**Responsibility:** User authentication

**Technology:** JWT, bcrypt, MongoDB

**Endpoints:**
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

**User Model:**
```typescript
interface User {
  id: string;
  email: string;
  username: string;
  password: string; // hashed
  knowledgeLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredLanguages: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

**JWT Payload:**
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}
```

#### 2.6 User Profile Service

**Port:** 3003  
**Responsibility:** User profile management

**Endpoints:**
```
GET    /api/profile/:userId
PUT    /api/profile/:userId
GET    /api/profile/:userId/history
POST   /api/profile/:userId/preferences
```

---

## Data Models

### User
```typescript
{
  _id: ObjectId,
  email: string,
  username: string,
  password: string, // bcrypt hashed
  knowledgeLevel: 'beginner' | 'intermediate' | 'advanced',
  preferredLanguages: string[],
  createdAt: Date,
  updatedAt: Date
}
```

### CodeExplanation
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  code: string,
  language: string,
  explanation: string,
  model: string,
  createdAt: Date
}
```

### ErrorAnalysis
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  error: string,
  code?: string,
  language: string,
  analysis: string,
  model: string,
  createdAt: Date
}
```

### UserPreferences
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  theme: 'light' | 'dark',
  voiceEnabled: boolean,
  autoDetectLanguage: boolean,
  defaultLanguage: string
}
```

---

## API Specifications

### Code Explanation API

**Endpoint:** `POST /api/v1/code/explain`

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "code": "string (required, max 2000 tokens)",
  "language": "string (optional, auto-detected if omitted)"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "explanation": "string",
  "language": "string",
  "model": "gemini-pro"
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Code is required"
}
```

**Response (500 Internal Server Error):**
```json
{
  "success": false,
  "error": "Failed to explain code"
}
```

### Error Analysis API

**Endpoint:** `POST /api/v1/error/analyze`

**Request Body:**
```json
{
  "error": "string (required)",
  "language": "string (optional)",
  "code": "string (optional)"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "analysis": "string",
  "language": "string",
  "model": "gemini-pro"
}
```

---

## Security Design

### Authentication Flow

```
1. User Registration
   ↓
   Validate input → Hash password (bcrypt) → Store in MongoDB
   ↓
   Generate JWT token → Return to client

2. User Login
   ↓
   Validate credentials → Compare password hash
   ↓
   Generate JWT token → Return to client

3. Protected Request
   ↓
   Extract JWT from Authorization header
   ↓
   Verify JWT signature → Extract user ID
   ↓
   Attach user to request → Process request
```

### API Key Management

**Development:**
```
.env file (not committed to Git)
GOOGLE_AI_API_KEY=AIzaSyD2L_EYXqdpXux3lC0kqVUOB0PlW21QUlM
```

**Production:**
```
Railway environment variables
Vercel environment variables
```

**Loading:**
```typescript
import 'dotenv/config';

const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  console.error('GOOGLE_AI_API_KEY not set');
  process.exit(1);
}
```

### Security Headers (Helmet)

```typescript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### CORS Configuration

```typescript
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://codementor-ai.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## Demo Mode Design

### Purpose
Allow users to explore features without backend services.

### Implementation

**Frontend Detection:**
```typescript
const isDemoMode = localStorage.getItem('demoMode') === 'true';
```

**Demo Explanations:**
```typescript
const demoExplanations = {
  javascript: {
    'console.log': 'This is a demo explanation...',
    'function': 'This is a demo explanation...',
    // ... more examples
  },
  python: {
    'print': 'This is a demo explanation...',
    'def': 'This is a demo explanation...',
    // ... more examples
  }
};
```

**Fallback Logic:**
```typescript
try {
  const response = await axios.post('/api/explain', { code, language });
  return response.data;
} catch (error) {
  // Backend unavailable, use demo mode
  console.warn('Using demo mode');
  localStorage.setItem('demoMode', 'true');
  return getDemoExplanation(code, language);
}
```

**Demo Indicators:**
```tsx
{isDemoMode && (
  <div className="demo-badge">
    🎮 Demo Mode - Using cached examples
  </div>
)}
```

---

## Deployment Architecture

### Frontend Deployment (Vercel)

**Build Configuration:**
```json
{
  "framework": "create-react-app",
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install",
  "devCommand": "npm start"
}
```

**Environment Variables:**
```
REACT_APP_API_BASE_URL=https://api-gateway.railway.app/api/v1
```

**vercel.json:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/services/web-client/index.html"
    }
  ]
}
```

### Backend Deployment (Railway)

**Service Configuration:**

**LLM Service:**
```
Root Directory: services/llm-service
Build Command: npm install && npm run build
Start Command: npm start
Port: 3007
```

**Environment Variables:**
```
PORT=3007
NODE_ENV=production
GOOGLE_AI_API_KEY=AIzaSyD2L_EYXqdpXux3lC0kqVUOB0PlW21QUlM
AI_MODEL=gemini-pro
ALLOWED_ORIGINS=*
```

**Code Explainer Service:**
```
Root Directory: services/code-explainer-service
Build Command: npm install && npm run build
Start Command: npm start
Port: 3004
```

**Environment Variables:**
```
PORT=3004
NODE_ENV=production
LLM_SERVICE_URL=https://llm-service.railway.app
ALLOWED_ORIGINS=*
```

**Error Analyzer Service:**
```
Root Directory: services/error-analyzer-service
Build Command: npm install && npm run build
Start Command: npm start
Port: 3005
```

**railway.json:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## Performance Optimization

### Frontend Optimization

**Code Splitting:**
```typescript
const CodeExplainerPage = lazy(() => import('./pages/CodeExplainerPage'));
const ErrorAnalyzerPage = lazy(() => import('./pages/ErrorAnalyzerPage'));
```

**Memoization:**
```typescript
const MemoizedExplanation = memo(({ explanation }) => (
  <div>{explanation}</div>
));
```

**Debouncing:**
```typescript
const debouncedDetect = debounce((code) => {
  setLanguage(detectLanguage(code));
}, 500);
```

### Backend Optimization

**Redis Caching:**
```typescript
const cacheKey = `explanation:${hash(code)}:${language}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const result = await generateExplanation(code, language);
await redis.setex(cacheKey, 3600, JSON.stringify(result));
return result;
```

**Connection Pooling:**
```typescript
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 2
});
```

---

## Error Handling

### Frontend Error Handling

```typescript
try {
  const response = await axios.post('/api/explain', { code, language });
  setExplanation(response.data.explanation);
} catch (error) {
  if (error.response?.status === 400) {
    setError('Invalid code submission');
  } else if (error.response?.status === 500) {
    setError('Server error. Please try again.');
  } else {
    // Network error, activate demo mode
    setError('Backend unavailable. Using demo mode.');
    setExplanation(getDemoExplanation(code, language));
  }
}
```

### Backend Error Handling

```typescript
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});
```

---

## Testing Strategy

### Unit Tests

**Frontend:**
```typescript
describe('detectLanguage', () => {
  it('should detect JavaScript', () => {
    const code = 'function hello() {}';
    expect(detectLanguage(code)).toBe('javascript');
  });
  
  it('should detect Python', () => {
    const code = 'def hello():';
    expect(detectLanguage(code)).toBe('python');
  });
});
```

**Backend:**
```typescript
describe('LLM Service', () => {
  it('should explain code', async () => {
    const response = await request(app)
      .post('/api/explain-code')
      .send({ code: 'console.log("test")', language: 'javascript' });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.explanation).toBeDefined();
  });
});
```

### Integration Tests

```typescript
describe('Code Explanation Flow', () => {
  it('should explain code end-to-end', async () => {
    // Register user
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@test.com', username: 'test', password: 'pass123' });
    
    const token = registerRes.body.token;
    
    // Explain code
    const explainRes = await request(app)
      .post('/api/code/explain')
      .set('Authorization', `Bearer ${token}`)
      .send({ code: 'console.log("test")', language: 'javascript' });
    
    expect(explainRes.status).toBe(200);
    expect(explainRes.body.explanation).toBeDefined();
  });
});
```

### Property-Based Tests

```typescript
import fc from 'fast-check';

describe('Language Detection Properties', () => {
  it('should always return a valid language', () => {
    fc.assert(
      fc.property(fc.string(), (code) => {
        const language = detectLanguage(code);
        const validLanguages = ['javascript', 'python', 'java', 'cpp', 'html', 'css'];
        return validLanguages.includes(language);
      })
    );
  });
});
```

---

## Monitoring and Logging

### Logging Strategy

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### Health Checks

```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'llm-service',
    apiKeyConfigured: !!process.env.GOOGLE_AI_API_KEY,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
```

### Metrics

- Request count
- Response time
- Error rate
- Cache hit rate
- Active users
- API usage

---

## Scalability Considerations

### Horizontal Scaling

**Railway Auto-Scaling:**
- Services scale based on CPU/memory usage
- Load balancing across instances
- Zero-downtime deployments

### Database Scaling

**MongoDB:**
- Replica sets for high availability
- Sharding for large datasets
- Indexes on frequently queried fields

**Redis:**
- Redis Cluster for distributed caching
- Persistence for critical data
- TTL for automatic cleanup

### CDN

**Vercel Edge Network:**
- Global CDN for static assets
- Edge caching for API responses
- Automatic image optimization

---

## Future Enhancements

### Phase 2
- Real-time code collaboration
- Interactive code playground
- Video tutorials
- Community forum
- Code challenges

### Phase 3
- Mobile apps (iOS/Android)
- IDE extensions (VS Code)
- Advanced analytics
- Multi-language UI
- Offline mode with full AI

---

## Technology Stack Summary

### Frontend
- React 18
- TypeScript
- React Router 6
- Axios
- Web Speech API
- CSS3 (custom styling)

### Backend
- Node.js 18+
- Express 4
- TypeScript
- Google Generative AI SDK
- JWT (jsonwebtoken)
- bcrypt

### Database
- MongoDB (Mongoose)
- Redis

### Deployment
- Vercel (Frontend)
- Railway (Backend)
- GitHub (Version Control)

### Development Tools
- Jest (Testing)
- fast-check (Property-based testing)
- ESLint (Linting)
- Prettier (Formatting)
- ts-node-dev (Development)

---

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Status:** ✅ Production Ready  
**Developers:** Akash Kumar & Shudanshu Kumar
