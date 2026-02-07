# Port Configuration - CodeMentor AI

## 🌐 Application Ports

Your CodeMentor AI application uses the following ports:

```
┌─────────────────────────────────────────────┐
│  Service                    Port            │
├─────────────────────────────────────────────┤
│  🌐 Web Application         8080  ← YOU     │
│  🔌 API Gateway             3000            │
│  🔐 Auth Service            3002            │
│  👤 User Profile Service    3003            │
│  💡 Code Explainer Service  3004            │
│  🔍 Error Analyzer Service  3005            │
│  📚 Language Tutor Service  3006            │
│  🤖 LLM Service             3007            │
└─────────────────────────────────────────────┘
```

## 🎯 Main Application URL

**Your web application runs on:**
```
http://localhost:8080
```

## ⚙️ Configuration Files

The port is configured in:

### 1. Web Client Environment
```bash
# services/web-client/.env
PORT=8080
REACT_APP_API_BASE_URL=http://localhost:3000/api/v1
```

### 2. CORS Configuration
```bash
# services/api-gateway/.env.example
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000

# services/auth-service/.env.example
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080
```

## 🔄 Changing the Port

If you need to use a different port:

### Option 1: Environment Variable
```bash
# Set PORT before starting
PORT=9000 npm run dev:client
```

### Option 2: Update .env File
```bash
# Edit services/web-client/.env
PORT=9000
```

### Option 3: Update CORS
Don't forget to update CORS in:
- `services/api-gateway/.env`
- `services/auth-service/.env`

Add your new port to `ALLOWED_ORIGINS`:
```
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:9000
```

## 🚀 Starting the Application

```bash
# Start all services
npm run dev

# Web app will be available at:
http://localhost:8080
```

## 🔍 Verify Port Usage

Check if port 8080 is available:

**Windows:**
```cmd
netstat -ano | findstr :8080
```

**macOS/Linux:**
```bash
lsof -i :8080
```

## 🛠️ Port Already in Use?

If port 8080 is already in use:

### Option 1: Kill the Process
**Windows:**
```cmd
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -ti:8080 | xargs kill -9
```

### Option 2: Use Different Port
Edit `services/web-client/.env`:
```
PORT=8081
```

## 📊 Port Architecture

```
┌──────────────┐
│   Browser    │
│ localhost:   │
│    8080      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Web Client   │
│  (React)     │
│  Port 8080   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ API Gateway  │
│  Port 3000   │
└──────┬───────┘
       │
       ├─────────────┬─────────────┬──────────────┐
       ▼             ▼             ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│   Auth   │  │  Profile │  │   Code   │  │   LLM    │
│   3002   │  │   3003   │  │   3004   │  │   3007   │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

## ✅ Quick Check

After starting the application:

1. **Check Web Client:**
   ```
   http://localhost:8080
   ```
   Should show: CodeMentor AI homepage

2. **Check API Gateway:**
   ```
   http://localhost:3000/health
   ```
   Should show: Health status

3. **Check All Services:**
   ```bash
   npm run health
   ```

## 🎯 Summary

- **Web Application:** Port 8080
- **API Gateway:** Port 3000
- **All Backend Services:** Ports 3002-3007
- **Configuration:** `services/web-client/.env`
- **CORS:** Update in API Gateway and Auth Service

---

**Your application is configured to run on port 8080!** 🚀
