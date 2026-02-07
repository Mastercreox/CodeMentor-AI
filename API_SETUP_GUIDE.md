# CodeMentor AI - API Setup Guide

Complete guide to set up API keys and make CodeMentor AI live with real AI-powered features.

---

## 🚀 Overview

To make CodeMentor AI fully functional with real AI features, you need to:
1. Get OpenAI API Key
2. Set up MongoDB (Database)
3. Set up Redis (Cache)
4. Configure Environment Variables
5. Start All Services

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Node.js 18+ installed
- ✅ npm installed
- ✅ Git installed
- ✅ Credit card (for OpenAI API - paid service)

---

## 🔑 Step 1: Get OpenAI API Key

### **1.1 Create OpenAI Account:**

1. Visit: https://platform.openai.com/signup
2. Sign up with your email
3. Verify your email address
4. Complete account setup

### **1.2 Add Payment Method:**

1. Go to: https://platform.openai.com/account/billing
2. Click "Add payment method"
3. Enter your credit card details
4. Add initial credits ($5-$10 recommended)

### **1.3 Generate API Key:**

1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Give it a name: "CodeMentor AI"
4. Copy the API key (starts with `sk-...`)
5. **IMPORTANT:** Save it securely - you won't see it again!

### **1.4 API Key Format:**
```
sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 💾 Step 2: Set Up MongoDB

### **Option A: MongoDB Atlas (Cloud - Recommended)**

1. **Create Account:**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `codementor`
   - Password: Generate strong password
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://codementor:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password

### **Option B: Local MongoDB**

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Download for Windows
   - Install with default settings

2. **Start MongoDB:**
   ```bash
   # MongoDB should start automatically
   # Connection string:
   mongodb://localhost:27017/codementor
   ```

---

## 🔴 Step 3: Set Up Redis

### **Option A: Redis Cloud (Recommended)**

1. **Create Account:**
   - Visit: https://redis.com/try-free/
   - Sign up for free

2. **Create Database:**
   - Click "New Database"
   - Choose "Free" plan
   - Select region
   - Click "Activate"

3. **Get Connection Details:**
   - Copy endpoint: `redis-xxxxx.cloud.redislabs.com:12345`
   - Copy password
   - Connection string format:
   ```
   redis://default:<password>@redis-xxxxx.cloud.redislabs.com:12345
   ```

### **Option B: Local Redis**

1. **Download Redis for Windows:**
   - Visit: https://github.com/microsoftarchive/redis/releases
   - Download Redis-x64-3.2.100.msi
   - Install with default settings

2. **Start Redis:**
   ```bash
   # Redis should start automatically
   # Connection string:
   redis://localhost:6379
   ```

---

## ⚙️ Step 4: Configure Environment Variables

### **4.1 LLM Service (OpenAI):**

Create/Edit: `services/llm-service/.env`

```env
# Server Configuration
PORT=3007
NODE_ENV=development

# OpenAI Configuration
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7

# Service URLs
API_GATEWAY_URL=http://localhost:3000
```

### **4.2 Auth Service:**

Create/Edit: `services/auth-service/.env`

```env
# Server Configuration
PORT=3002
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://codementor:your-password@cluster0.xxxxx.mongodb.net/codementor?retryWrites=true&w=majority

# Redis
REDIS_URL=redis://default:your-password@redis-xxxxx.cloud.redislabs.com:12345

# JWT Secret (generate random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:8080
```

### **4.3 API Gateway:**

Create/Edit: `services/api-gateway/.env`

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Service URLs
AUTH_SERVICE_URL=http://localhost:3002
USER_PROFILE_SERVICE_URL=http://localhost:3003
CODE_EXPLAINER_SERVICE_URL=http://localhost:3004
ERROR_ANALYZER_SERVICE_URL=http://localhost:3005
LANGUAGE_TUTOR_SERVICE_URL=http://localhost:3006
LLM_SERVICE_URL=http://localhost:3007

# CORS
CORS_ORIGIN=http://localhost:8080

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **4.4 Code Explainer Service:**

Create/Edit: `services/code-explainer-service/.env`

```env
# Server Configuration
PORT=3004
NODE_ENV=development

# LLM Service
LLM_SERVICE_URL=http://localhost:3007

# Redis
REDIS_URL=redis://default:your-password@redis-xxxxx.cloud.redislabs.com:12345
```

### **4.5 Error Analyzer Service:**

Create/Edit: `services/error-analyzer-service/.env`

```env
# Server Configuration
PORT=3005
NODE_ENV=development

# LLM Service
LLM_SERVICE_URL=http://localhost:3007

# Redis
REDIS_URL=redis://default:your-password@redis-xxxxx.cloud.redislabs.com:12345
```

### **4.6 Web Client:**

Already configured: `services/web-client/.env`

```env
PORT=8080
REACT_APP_API_BASE_URL=http://localhost:3000/api/v1
DISABLE_ESLINT_PLUGIN=true
```

---

## 🎯 Step 5: Generate JWT Secret

Generate a secure random string for JWT_SECRET:

### **Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### **Option 2: Using Online Generator**
Visit: https://randomkeygen.com/
Copy a "CodeIgniter Encryption Key"

### **Option 3: Manual**
Use any random 64+ character string:
```
mySuper$ecretJWT!Key2024ForCodeMentorAI#ProductionReady@2026
```

---

## 📝 Step 6: Quick Setup Script

Create a file: `setup-env.bat`

```batch
@echo off
echo Setting up CodeMentor AI Environment Variables...
echo.

REM Prompt for OpenAI API Key
set /p OPENAI_KEY="Enter your OpenAI API Key: "

REM Prompt for MongoDB URI
set /p MONGO_URI="Enter your MongoDB Connection String: "

REM Prompt for Redis URL
set /p REDIS_URI="Enter your Redis Connection String: "

REM Generate JWT Secret
set JWT_SECRET=mySuper$ecretJWT!Key2024ForCodeMentorAI#ProductionReady@2026

echo.
echo Creating environment files...

REM LLM Service
(
echo PORT=3007
echo NODE_ENV=development
echo OPENAI_API_KEY=%OPENAI_KEY%
echo OPENAI_MODEL=gpt-3.5-turbo
echo OPENAI_MAX_TOKENS=2000
echo OPENAI_TEMPERATURE=0.7
echo API_GATEWAY_URL=http://localhost:3000
) > services\llm-service\.env

REM Auth Service
(
echo PORT=3002
echo NODE_ENV=development
echo MONGODB_URI=%MONGO_URI%
echo REDIS_URL=%REDIS_URI%
echo JWT_SECRET=%JWT_SECRET%
echo JWT_EXPIRES_IN=7d
echo CORS_ORIGIN=http://localhost:8080
) > services\auth-service\.env

REM API Gateway
(
echo PORT=3000
echo NODE_ENV=development
echo AUTH_SERVICE_URL=http://localhost:3002
echo USER_PROFILE_SERVICE_URL=http://localhost:3003
echo CODE_EXPLAINER_SERVICE_URL=http://localhost:3004
echo ERROR_ANALYZER_SERVICE_URL=http://localhost:3005
echo LANGUAGE_TUTOR_SERVICE_URL=http://localhost:3006
echo LLM_SERVICE_URL=http://localhost:3007
echo CORS_ORIGIN=http://localhost:8080
echo RATE_LIMIT_WINDOW_MS=900000
echo RATE_LIMIT_MAX_REQUESTS=100
) > services\api-gateway\.env

REM Code Explainer Service
(
echo PORT=3004
echo NODE_ENV=development
echo LLM_SERVICE_URL=http://localhost:3007
echo REDIS_URL=%REDIS_URI%
) > services\code-explainer-service\.env

REM Error Analyzer Service
(
echo PORT=3005
echo NODE_ENV=development
echo LLM_SERVICE_URL=http://localhost:3007
echo REDIS_URL=%REDIS_URI%
) > services\error-analyzer-service\.env

echo.
echo ✅ Environment files created successfully!
echo.
echo Next steps:
echo 1. Run: npm install
echo 2. Run: npm run build
echo 3. Run: npm run dev
echo.
pause
```

**Run the script:**
```bash
setup-env.bat
```

---

## 🚀 Step 7: Start All Services

### **7.1 Install Dependencies:**
```bash
npm install
npm run build
```

### **7.2 Start All Services:**
```bash
npm run dev
```

This will start:
- ✅ API Gateway (Port 3000)
- ✅ Auth Service (Port 3002)
- ✅ Code Explainer Service (Port 3004)
- ✅ Error Analyzer Service (Port 3005)
- ✅ LLM Service (Port 3007)
- ✅ Web Client (Port 8080)

### **7.3 Access the Application:**
```
http://localhost:8080
```

---

## ✅ Step 8: Verify Setup

### **8.1 Check Services:**
```bash
npm run health
```

### **8.2 Test Features:**

1. **Register Account:**
   - Go to http://localhost:8080
   - Click "Get Started"
   - Create account (will use real database now!)

2. **Test Code Explainer:**
   - Go to Code Explainer
   - Paste some code
   - Click "Explain Code"
   - Should get real AI explanation!

3. **Test Error Analyzer:**
   - Go to Error Analyzer
   - Paste an error message
   - Click "Analyze Error"
   - Should get real AI analysis!

---

## 💰 Cost Estimation

### **OpenAI API Costs (GPT-3.5-Turbo):**
- Input: $0.50 per 1M tokens
- Output: $1.50 per 1M tokens
- Average explanation: ~500 tokens = $0.001
- **100 explanations ≈ $0.10**

### **MongoDB Atlas:**
- Free tier: 512MB storage
- Sufficient for development

### **Redis Cloud:**
- Free tier: 30MB storage
- Sufficient for development

**Total Monthly Cost (Light Usage):** ~$5-10

---

## 🔒 Security Best Practices

1. **Never commit .env files to Git**
2. **Use strong JWT secrets**
3. **Rotate API keys regularly**
4. **Use environment-specific keys**
5. **Enable MongoDB authentication**
6. **Use HTTPS in production**
7. **Implement rate limiting**
8. **Monitor API usage**

---

## 🐛 Troubleshooting

### **OpenAI API Errors:**
```
Error: Invalid API key
Solution: Check if API key is correct in .env file
```

### **MongoDB Connection Failed:**
```
Error: MongoNetworkError
Solution: Check connection string and whitelist IP
```

### **Redis Connection Failed:**
```
Error: ECONNREFUSED
Solution: Verify Redis URL and credentials
```

### **Services Not Starting:**
```bash
# Check if ports are available
netstat -ano | findstr "3000 3002 3004 3005 3007 8080"

# Kill processes if needed
taskkill /PID <process_id> /F
```

---

## 📚 Additional Resources

- **OpenAI Documentation:** https://platform.openai.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Redis Cloud Docs:** https://docs.redis.com/latest/rc/
- **Node.js Best Practices:** https://github.com/goldbergyoni/nodebestpractices

---

## 🎉 Success!

Once everything is set up, you'll have:
- ✅ Real AI-powered code explanations
- ✅ Real AI-powered error analysis
- ✅ Persistent user accounts (MongoDB)
- ✅ Fast caching (Redis)
- ✅ Production-ready architecture

**Your CodeMentor AI is now LIVE!** 🚀

---

**Need Help?** Check TROUBLESHOOTING.md or create an issue on GitHub.
