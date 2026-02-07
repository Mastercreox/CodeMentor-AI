# 🚂 Railway Deployment Guide - CodeMentor AI Backend

Complete guide to deploy CodeMentor AI backend services to Railway.

---

## 🎯 What We're Deploying

**Backend Services:**
- LLM Service (Port 3007) - Google AI integration
- Code Explainer Service (Port 3004)
- Error Analyzer Service (Port 3005)
- API Gateway (Port 3000)

**API Key:** Already configured in `.env` files
```
AIzaSyD2L_EYXqdpXux3lC0kqVUOB0PlW21QUlM
```

---

## ⚡ Quick Deploy (10 Minutes)

### Step 1: Install Dependencies

```cmd
cd services\llm-service
npm install @google/generative-ai axios dotenv cors helmet
npm install

cd ..\code-explainer-service
npm install axios dotenv cors helmet
npm install

cd ..\error-analyzer-service
npm install axios dotenv cors helmet
npm install

cd ..\api-gateway
npm install
```

### Step 2: Build Services

```cmd
cd services\llm-service
npm run build

cd ..\code-explainer-service
npm run build

cd ..\error-analyzer-service
npm run build

cd ..\api-gateway
npm run build
```

### Step 3: Test Locally

```cmd
# Terminal 1 - LLM Service
cd services\llm-service
npm start

# Terminal 2 - Code Explainer
cd services\code-explainer-service
npm start

# Terminal 3 - Error Analyzer
cd services\error-analyzer-service
npm start

# Terminal 4 - API Gateway
cd services\api-gateway
npm start
```

**Test endpoints:**
```
http://localhost:3007/health
http://localhost:3004/health
http://localhost:3005/health
http://localhost:3000/health
```

---

## 🚂 Deploy to Railway

### Step 1: Create Railway Account

1. Go to: https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub

### Step 2: Deploy LLM Service

1. **Click:** "New Project" → "Deploy from GitHub repo"
2. **Select:** your `codementor-ai` repository
3. **Configure:**
   - **Service Name:** `llm-service`
   - **Root Directory:** `services/llm-service`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

4. **Add Environment Variables:**
```
PORT=3007
NODE_ENV=production
GOOGLE_AI_API_KEY=AIzaSyD2L_EYXqdpXux3lC0kqVUOB0PlW21QUlM
AI_MODEL=gemini-pro
AI_MAX_TOKENS=2000
AI_TEMPERATURE=0.7
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600
MAX_REQUESTS_PER_MINUTE=60
ALLOWED_ORIGINS=*
LOG_LEVEL=info
```

5. **Click:** "Deploy"

6. **Get URL:** Copy the generated URL (e.g., `https://llm-service-production.up.railway.app`)

### Step 3: Deploy Code Explainer Service

1. **Click:** "New Service" → "GitHub Repo"
2. **Configure:**
   - **Service Name:** `code-explainer-service`
   - **Root Directory:** `services/code-explainer-service`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

3. **Add Environment Variables:**
```
PORT=3004
NODE_ENV=production
LLM_SERVICE_URL=https://llm-service-production.up.railway.app
GOOGLE_AI_API_KEY=AIzaSyD2L_EYXqdpXux3lC0kqVUOB0PlW21QUlM
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600
ALLOWED_ORIGINS=*
LOG_LEVEL=info
```

Replace `https://llm-service-production.up.railway.app` with your actual LLM service URL from Step 2.

4. **Click:** "Deploy"

### Step 4: Deploy Error Analyzer Service

1. **Click:** "New Service" → "GitHub Repo"
2. **Configure:**
   - **Service Name:** `error-analyzer-service`
   - **Root Directory:** `services/error-analyzer-service`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

3. **Add Environment Variables:**
```
PORT=3005
NODE_ENV=production
LLM_SERVICE_URL=https://llm-service-production.up.railway.app
GOOGLE_AI_API_KEY=AIzaSyD2L_EYXqdpXux3lC0kqVUOB0PlW21QUlM
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600
ALLOWED_ORIGINS=*
LOG_LEVEL=info
```

4. **Click:** "Deploy"

### Step 5: Deploy API Gateway

1. **Click:** "New Service" → "GitHub Repo"
2. **Configure:**
   - **Service Name:** `api-gateway`
   - **Root Directory:** `services/api-gateway`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

3. **Add Environment Variables:**
```
PORT=3000
NODE_ENV=production
AUTH_SERVICE_URL=http://localhost:3002
CODE_EXPLAINER_SERVICE_URL=https://code-explainer-production.up.railway.app
ERROR_ANALYZER_SERVICE_URL=https://error-analyzer-production.up.railway.app
LANGUAGE_TUTOR_SERVICE_URL=http://localhost:3006
USER_PROFILE_SERVICE_URL=http://localhost:3003
ALLOWED_ORIGINS=*
LOG_LEVEL=info
```

Replace URLs with your actual service URLs.

4. **Click:** "Deploy"

---

## 🔗 Update Frontend

Update your Vercel deployment environment variables:

```
REACT_APP_API_BASE_URL=https://api-gateway-production.up.railway.app/api/v1
```

**Steps:**
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Update `REACT_APP_API_BASE_URL`
5. Redeploy

---

## ✅ Verify Deployment

### Test Each Service

**LLM Service:**
```bash
curl https://llm-service-production.up.railway.app/health
```

**Code Explainer:**
```bash
curl https://code-explainer-production.up.railway.app/health
```

**Error Analyzer:**
```bash
curl https://error-analyzer-production.up.railway.app/health
```

**API Gateway:**
```bash
curl https://api-gateway-production.up.railway.app/health
```

### Test Code Explanation

```bash
curl -X POST https://code-explainer-production.up.railway.app/api/explain \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function hello() { console.log(\"Hello World\"); }",
    "language": "javascript"
  }'
```

### Test Error Analysis

```bash
curl -X POST https://error-analyzer-production.up.railway.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "error": "TypeError: Cannot read property of undefined",
    "language": "javascript"
  }'
```

---

## 💰 Cost Estimation

**Railway Pricing:**
- **Hobby Plan:** $5/month per service
- **LLM Service:** $5/month
- **Code Explainer:** $5/month
- **Error Analyzer:** $5/month
- **API Gateway:** $5/month

**Total:** ~$20/month

**Google AI API:**
- Free tier: 60 requests/minute
- Paid: ~$0.001 per request

**Total Monthly Cost:** ~$20-25/month

---

## 🔒 Security Best Practices

### 1. Environment Variables
✅ API key stored in Railway environment variables
✅ Not committed to Git
✅ Loaded via `dotenv/config`

### 2. CORS Configuration
```typescript
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
```

Update `ALLOWED_ORIGINS` to your frontend URL:
```
ALLOWED_ORIGINS=https://codementor-ai.vercel.app
```

### 3. Helmet Security Headers
```typescript
app.use(helmet());
```

### 4. Input Validation
All endpoints validate required fields before processing.

### 5. Error Handling
Graceful error handling with proper HTTP status codes.

---

## 🔄 Auto-Deploy on Git Push

Railway automatically deploys when you push to GitHub:

```cmd
git add .
git commit -m "Update backend services"
git push origin main
```

Railway will:
1. Detect changes
2. Build services
3. Deploy updates
4. Update live URLs

---

## 📊 Monitor Your Services

### Railway Dashboard

**View:**
- Deployment logs
- Resource usage (CPU, Memory)
- Request metrics
- Error logs

**Access:** https://railway.app/dashboard

### Health Checks

Set up monitoring:
```bash
# Check every 5 minutes
curl https://llm-service-production.up.railway.app/health
```

---

## 🆘 Troubleshooting

### Issue 1: Build Failed

**Error:** `Cannot find module '@google/generative-ai'`

**Fix:**
```cmd
cd services/llm-service
npm install @google/generative-ai
git add package.json package-lock.json
git commit -m "Add Google AI dependency"
git push
```

### Issue 2: API Key Not Working

**Check:**
1. Verify environment variable is set in Railway
2. Check variable name: `GOOGLE_AI_API_KEY`
3. Redeploy service after adding variable

### Issue 3: Service Not Starting

**Check logs in Railway:**
1. Go to service
2. Click "Deployments"
3. View logs
4. Look for errors

### Issue 4: CORS Errors

**Update ALLOWED_ORIGINS:**
```
ALLOWED_ORIGINS=https://codementor-ai.vercel.app,http://localhost:8080
```

---

## 📝 Final Checklist

- [ ] All services installed dependencies
- [ ] All services built successfully
- [ ] All services tested locally
- [ ] Railway account created
- [ ] All services deployed to Railway
- [ ] Environment variables configured
- [ ] Service URLs copied
- [ ] Frontend updated with API URLs
- [ ] All health checks passing
- [ ] Code explanation tested
- [ ] Error analysis tested
- [ ] CORS configured properly
- [ ] Monitoring set up

---

## 🎉 Success!

Your CodeMentor AI backend is now LIVE!

**Service URLs:**
```
LLM Service: https://llm-service-production.up.railway.app
Code Explainer: https://code-explainer-production.up.railway.app
Error Analyzer: https://error-analyzer-production.up.railway.app
API Gateway: https://api-gateway-production.up.railway.app
```

**Frontend:** https://codementor-ai.vercel.app

**Features Now Working:**
✅ Real AI code explanations
✅ Real AI error analysis
✅ Persistent across devices
✅ Production-ready
✅ Secure API key management

---

## 🚀 Quick Commands Reference

### Local Development
```cmd
# Install dependencies
npm run install:services

# Build all services
npm run build:services

# Start all services
npm run start:services

# Test health
curl http://localhost:3007/health
```

### Deployment
```cmd
# Prepare for deployment
git add .
git commit -m "Deploy backend services"
git push origin main

# Railway auto-deploys!
```

### Testing
```cmd
# Test code explanation
curl -X POST https://code-explainer-production.up.railway.app/api/explain \
  -H "Content-Type: application/json" \
  -d '{"code":"console.log(\"test\")","language":"javascript"}'

# Test error analysis
curl -X POST https://error-analyzer-production.up.railway.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"error":"TypeError: undefined","language":"javascript"}'
```

---

**Developed by:** Akash Kumar & Shudanshu Kumar  
**Platform:** Railway  
**API:** Google Generative AI  
**Status:** 🟢 LIVE & PRODUCTION READY
