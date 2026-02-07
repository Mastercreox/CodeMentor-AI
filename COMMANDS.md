# 🎯 Quick Commands Reference - CodeMentor AI

All commands you need in one place.

---

## 🔧 Backend Setup

### Install Dependencies
```cmd
# Automated (Windows)
install-backend.bat

# Manual - LLM Service
cd services\llm-service
npm install @google/generative-ai axios dotenv cors helmet
npm install

# Manual - Code Explainer
cd services\code-explainer-service
npm install axios dotenv cors helmet
npm install

# Manual - Error Analyzer
cd services\error-analyzer-service
npm install axios dotenv cors helmet
npm install
```

### Build Services
```cmd
# All services
npm run build:services

# Individual
cd services\llm-service && npm run build
cd services\code-explainer-service && npm run build
cd services\error-analyzer-service && npm run build
```

---

## 🚀 Start Services

### All Services
```cmd
npm run start:services
```

### Individual Services
```cmd
# LLM Service (Terminal 1)
cd services\llm-service
npm start

# Code Explainer (Terminal 2)
cd services\code-explainer-service
npm start

# Error Analyzer (Terminal 3)
cd services\error-analyzer-service
npm start
```

---

## ✅ Test Services

### Health Checks
```cmd
curl http://localhost:3007/health
curl http://localhost:3004/health
curl http://localhost:3005/health
```

### Test Code Explanation
```cmd
curl -X POST http://localhost:3004/api/explain ^
  -H "Content-Type: application/json" ^
  -d "{\"code\":\"function hello() { console.log('Hello'); }\",\"language\":\"javascript\"}"
```

### Test Error Analysis
```cmd
curl -X POST http://localhost:3005/api/analyze ^
  -H "Content-Type: application/json" ^
  -d "{\"error\":\"TypeError: Cannot read property 'name' of undefined\",\"language\":\"javascript\"}"
```

---

## 🌐 Frontend Deployment

### Deploy to Vercel
```cmd
# Windows
deploy.bat

# Manual
git init
git add .
git commit -m "Deploy CodeMentor AI"
git push origin main
# Then go to vercel.com
```

---

## 🚂 Backend Deployment

### Push to GitHub
```cmd
git add .
git commit -m "Add backend services"
git push origin main
```

### Railway Deployment
```
1. Go to railway.app
2. Create new project
3. Deploy from GitHub
4. Add environment variables
5. Deploy!
```

---

## 🔍 Debugging

### Check Running Processes
```cmd
netstat -ano | findstr :3007
netstat -ano | findstr :3004
netstat -ano | findstr :3005
```

### Kill Process
```cmd
taskkill /PID <PID> /F
```

### View Logs
```cmd
# Check terminal output where service is running
```

---

## 📦 Package Management

### Install All Dependencies
```cmd
npm install
```

### Update Dependencies
```cmd
npm update
```

### Clean Install
```cmd
npm run clean
npm install
```

---

## 🧪 Testing

### Run All Tests
```cmd
npm test
```

### Run Unit Tests
```cmd
npm run test:unit
```

### Run Property Tests
```cmd
npm run test:property
```

---

## 🔐 Environment Variables

### View Current Environment
```cmd
# Windows
set

# Check specific variable
echo %GOOGLE_AI_API_KEY%
```

### Edit .env Files
```cmd
notepad services\llm-service\.env
notepad services\code-explainer-service\.env
notepad services\error-analyzer-service\.env
```

---

## 📊 Monitoring

### Check Service Status
```cmd
curl http://localhost:3007/health
curl http://localhost:3004/health
curl http://localhost:3005/health
```

### View Resource Usage
```cmd
# Windows Task Manager
taskmgr

# Or use PowerShell
Get-Process node
```

---

## 🔄 Git Commands

### Initialize Repository
```cmd
git init
git add .
git commit -m "Initial commit"
```

### Push Changes
```cmd
git add .
git commit -m "Update message"
git push origin main
```

### Check Status
```cmd
git status
git log --oneline
```

---

## 🛠️ Development

### Start Development Mode
```cmd
npm run dev
```

### Start Individual Service in Dev Mode
```cmd
cd services\llm-service
npm run dev
```

### Type Check
```cmd
npm run type-check
```

### Lint Code
```cmd
npm run lint
```

---

## 🧹 Cleanup

### Clean Build Files
```cmd
npm run clean
```

### Remove node_modules
```cmd
# Windows
rmdir /s /q node_modules
rmdir /s /q services\llm-service\node_modules
rmdir /s /q services\code-explainer-service\node_modules
rmdir /s /q services\error-analyzer-service\node_modules
```

### Fresh Install
```cmd
npm run clean
npm install
npm run build:services
```

---

## 📱 Frontend Commands

### Start Web Client
```cmd
cd services\web-client
npm start
```

### Build Web Client
```cmd
cd services\web-client
npm run build
```

---

## 🎯 Quick Workflows

### Full Local Setup
```cmd
# 1. Install backend
install-backend.bat

# 2. Start services
npm run start:services

# 3. Test health
curl http://localhost:3007/health

# 4. Start frontend (new terminal)
cd services\web-client
npm start
```

### Deploy Everything
```cmd
# 1. Commit changes
git add .
git commit -m "Deploy updates"
git push origin main

# 2. Backend auto-deploys on Railway
# 3. Frontend auto-deploys on Vercel
```

### Quick Test
```cmd
# 1. Start services
npm run start:services

# 2. Test in browser
start http://localhost:3007/health
start http://localhost:3004/health
start http://localhost:3005/health
```

---

## 🆘 Emergency Commands

### Stop All Node Processes
```cmd
taskkill /F /IM node.exe
```

### Reset Everything
```cmd
npm run clean
rmdir /s /q node_modules
npm install
npm run build:services
npm run start:services
```

### Check Ports
```cmd
netstat -ano | findstr :3000
netstat -ano | findstr :3004
netstat -ano | findstr :3005
netstat -ano | findstr :3007
netstat -ano | findstr :8080
```

---

## 📚 Documentation Commands

### View Documentation
```cmd
start README.md
start BACKEND_QUICK_START.md
start RAILWAY_DEPLOYMENT.md
start API_KEY_SETUP_COMPLETE.md
```

---

## ✅ Verification Commands

### Full System Check
```cmd
# 1. Check Node version
node --version

# 2. Check npm version
npm --version

# 3. Check Git version
git --version

# 4. Check services
curl http://localhost:3007/health
curl http://localhost:3004/health
curl http://localhost:3005/health

# 5. Check frontend
start http://localhost:8080
```

---

**Quick Reference Card - Keep this handy!** 📋

**Most Used Commands:**
```cmd
install-backend.bat          # Install dependencies
npm run start:services       # Start all services
curl http://localhost:3007/health  # Test health
git push origin main         # Deploy updates
```

---

**Developed by:** Akash Kumar & Shudanshu Kumar  
**Last Updated:** February 2026
