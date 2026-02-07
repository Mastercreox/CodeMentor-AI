# ⚡ Backend Quick Start - CodeMentor AI

Get your backend services running with AI in 5 minutes!

---

## 🎯 What You're Getting

**Real AI Features:**
- ✅ Code explanations powered by Google AI
- ✅ Error analysis with AI suggestions
- ✅ Production-ready backend services
- ✅ Secure API key management

**API Key:** Already configured!
```
AIzaSyD2L_EYXqdpXux3lC0kqVUOB0PlW21QUlM
```

---

## ⚡ Quick Install (2 Minutes)

### Windows:
```cmd
install-backend.bat
```

### Manual:
```cmd
cd services\llm-service
npm install @google/generative-ai axios dotenv cors helmet
npm install
npm run build

cd ..\code-explainer-service
npm install axios dotenv cors helmet
npm install
npm run build

cd ..\error-analyzer-service
npm install axios dotenv cors helmet
npm install
npm run build
```

---

## 🚀 Start Services (1 Minute)

### Option 1: All Services at Once
```cmd
npm run start:services
```

### Option 2: Individual Services

**Terminal 1 - LLM Service:**
```cmd
cd services\llm-service
npm start
```

**Terminal 2 - Code Explainer:**
```cmd
cd services\code-explainer-service
npm start
```

**Terminal 3 - Error Analyzer:**
```cmd
cd services\error-analyzer-service
npm start
```

---

## ✅ Test It Works (1 Minute)

### Health Checks

Open browser or use curl:
```
http://localhost:3007/health
http://localhost:3004/health
http://localhost:3005/health
```

### Test Code Explanation

**PowerShell:**
```powershell
$body = @{
    code = "function hello() { console.log('Hello'); }"
    language = "javascript"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3004/api/explain" -Method Post -Body $body -ContentType "application/json"
```

**CMD (using curl):**
```cmd
curl -X POST http://localhost:3004/api/explain -H "Content-Type: application/json" -d "{\"code\":\"console.log('test')\",\"language\":\"javascript\"}"
```

### Test Error Analysis

**PowerShell:**
```powershell
$body = @{
    error = "TypeError: Cannot read property 'name' of undefined"
    language = "javascript"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3005/api/analyze" -Method Post -Body $body -ContentType "application/json"
```

---

## 🌐 Deploy to Production (10 Minutes)

See: [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)

**Quick Steps:**
1. Push code to GitHub
2. Create Railway account
3. Deploy each service
4. Add environment variables
5. Update frontend with API URLs

**Cost:** ~$20/month

---

## 🔧 Configuration

### Environment Variables

All services have `.env` files pre-configured with:
- ✅ Google AI API Key
- ✅ Port numbers
- ✅ CORS settings
- ✅ Production settings

**Files:**
- `services/llm-service/.env`
- `services/code-explainer-service/.env`
- `services/error-analyzer-service/.env`

---

## 📊 Service Architecture

```
Frontend (Vercel)
    ↓
API Gateway (Port 3000)
    ↓
┌─────────────────────────────────┐
│                                 │
│  Code Explainer (3004)         │  Error Analyzer (3005)
│         ↓                       │         ↓
│         └───────────────────────┴─────────┘
│                     ↓
│              LLM Service (3007)
│                     ↓
│              Google AI API
│
└─────────────────────────────────┘
```

---

## 🆘 Troubleshooting

### Issue: Cannot find module '@google/generative-ai'

**Fix:**
```cmd
cd services\llm-service
npm install @google/generative-ai
```

### Issue: Port already in use

**Fix:**
```cmd
# Kill process on port 3007
netstat -ano | findstr :3007
taskkill /PID <PID> /F
```

### Issue: API key not working

**Check:**
1. File exists: `services/llm-service/.env`
2. Contains: `GOOGLE_AI_API_KEY=AIzaSyD2L_EYXqdpXux3lC0kqVUOB0PlW21QUlM`
3. Restart service

---

## 📝 Quick Commands

```cmd
# Install all dependencies
install-backend.bat

# Start all services
npm run start:services

# Build all services
npm run build:services

# Test health
curl http://localhost:3007/health

# View logs
# Check terminal output
```

---

## 🎉 Success Checklist

- [ ] Dependencies installed
- [ ] Services built successfully
- [ ] All services running
- [ ] Health checks passing
- [ ] Code explanation works
- [ ] Error analysis works
- [ ] Ready for deployment!

---

## 🚀 Next Steps

1. **Test Locally:** Try code explanation and error analysis
2. **Deploy to Railway:** Follow [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)
3. **Update Frontend:** Add API URLs to Vercel
4. **Go Live:** Your app now has real AI features!

---

**Your backend is ready!** 🎊

**Local URLs:**
- LLM Service: http://localhost:3007
- Code Explainer: http://localhost:3004
- Error Analyzer: http://localhost:3005

**Next:** Deploy to Railway for production!

---

**Developed by:** Akash Kumar & Shudanshu Kumar  
**API:** Google Generative AI (Gemini Pro)  
**Status:** 🟢 READY TO DEPLOY
