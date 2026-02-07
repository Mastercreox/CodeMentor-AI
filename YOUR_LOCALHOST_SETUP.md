# 🌐 Your Localhost Setup Guide

## ⚠️ Important: Node.js Not Detected

Your system doesn't have Node.js installed yet. You need to install it first to run the CodeMentor AI application.

## 📥 Step 1: Install Node.js

### For Windows:

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Download the **LTS version** (recommended)
   - Current LTS: Node.js 20.x or 18.x

2. **Run the Installer:**
   - Double-click the downloaded `.msi` file
   - Follow the installation wizard
   - ✅ Check "Automatically install necessary tools"
   - Click "Install"

3. **Verify Installation:**
   Open a **NEW** Command Prompt or PowerShell and run:
   ```cmd
   node --version
   npm --version
   ```
   You should see version numbers like:
   ```
   v20.10.0
   10.2.3
   ```

## 🔍 Step 2: Detect Your Available Ports

After installing Node.js, run this command to detect available ports:

```bash
npm run detect-ports
```

This will show you:
- ✅ Which ports are free
- ❌ Which ports are in use
- 💡 Recommended ports to use

## 🎯 Step 3: Your Localhost Configuration

Based on your earlier preference, your application is configured to use:

### **Web Application Port: 8080**

Your application will be accessible at:
```
http://localhost:8080
```

### All Service Ports:
```
Web Application:  http://localhost:8080  ← Your main app
API Gateway:      http://localhost:3000
Auth Service:     http://localhost:3002
User Profile:     http://localhost:3003
Code Explainer:   http://localhost:3004
Error Analyzer:   http://localhost:3005
Language Tutor:   http://localhost:3006
LLM Service:      http://localhost:3007
```

## 🚀 Step 4: Start Your Application

Once Node.js is installed:

1. **Install Dependencies:**
   ```bash
   npm run fix
   ```

2. **Start All Services:**
   ```bash
   npm run dev
   ```

3. **Open Your Browser:**
   ```
   http://localhost:8080
   ```

## 🔧 If Port 8080 is Already in Use

### Check What's Using Port 8080:

**Windows:**
```cmd
netstat -ano | findstr :8080
```

**macOS/Linux:**
```bash
lsof -i :8080
```

### Option 1: Stop the Process

**Windows:**
```cmd
# Find the PID from netstat command above
taskkill /PID <PID_NUMBER> /F
```

**macOS/Linux:**
```bash
lsof -ti:8080 | xargs kill -9
```

### Option 2: Use a Different Port

Edit `services/web-client/.env`:
```env
PORT=8081
```

Then your app will be at: `http://localhost:8081`

## 📊 Common Localhost Ports

Here are typical ports you might see in use:

| Port | Common Use |
|------|------------|
| 80 | HTTP (web servers) |
| 443 | HTTPS (secure web) |
| 3000 | Node.js apps, React dev server |
| 3001 | Alternative React port |
| 5000 | Flask, various dev servers |
| 8000 | Django, Python servers |
| 8080 | Alternative HTTP, Tomcat, Jenkins |
| 8888 | Jupyter Notebook |
| 9000 | PHP-FPM, various apps |

## 🎯 Your Specific Setup

### Current Configuration:
- **Web Client:** Port 8080
- **API Gateway:** Port 3000
- **Backend Services:** Ports 3002-3007

### Configuration Files:
```
services/web-client/.env
  PORT=8080
  REACT_APP_API_BASE_URL=http://localhost:3000/api/v1

services/api-gateway/.env.example
  PORT=3000
  ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000

services/auth-service/.env.example
  PORT=3002
  ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080
```

## 🔍 Detect Ports Anytime

After installing Node.js, you can check port availability anytime:

```bash
# Run the detection script
npm run detect-ports

# Or manually
node detect-ports.js
```

This will show you:
- Which ports are free ✅
- Which ports are in use ❌
- Suggested alternatives 💡

## 📝 Quick Reference

### Check if Node.js is Installed:
```bash
node --version
npm --version
```

### Check Port Availability:
```bash
npm run detect-ports
```

### Start Application:
```bash
npm run dev
```

### Your Application URL:
```
http://localhost:8080
```

## 🆘 Troubleshooting

### "Node is not recognized"
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation
- Open a NEW terminal window

### "Port already in use"
- Run `npm run detect-ports` to find available ports
- Stop the process using the port
- Or change to a different port in `.env`

### "Cannot connect to localhost"
- Make sure services are running: `npm run dev`
- Check if port is correct: `npm run detect-ports`
- Verify firewall isn't blocking the port

## ✅ Success Checklist

- [ ] Node.js installed (v18+ or v20+)
- [ ] npm installed (comes with Node.js)
- [ ] Dependencies installed (`npm run fix`)
- [ ] Port 8080 available (or alternative chosen)
- [ ] Services started (`npm run dev`)
- [ ] Browser opened to `http://localhost:8080`

## 🎉 Next Steps

Once Node.js is installed and you've run the setup:

1. ✅ Visit `http://localhost:8080`
2. ✅ Create an account
3. ✅ Login to dashboard
4. ✅ Try the Code Explainer
5. ✅ Explore all features!

---

**Your localhost will be: http://localhost:8080** 🚀

(After installing Node.js and running `npm run dev`)
