# CodeMentor AI

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🎓 CodeMentor AI - Learn to Code with AI Assistance 🚀    ║
║                                                               ║
║   ✅ Web Application Ready!                                  ║
║   ✅ User Authentication Working!                            ║
║   ✅ Interactive Features Available!                         ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

Educational platform for beginner programmers that provides personalized explanations, error analysis, and educational content.

## 🎉 **NOW AVAILABLE: Full Web Application!**

The CodeMentor AI web application is **ready to use**! Create an account, explore features, and start learning to code with AI assistance.

## 🚀 Quick Start

**New to the project? Start here:**

1. **Prerequisites Check:** Ensure you have Node.js 18+, MongoDB, and Redis installed
   - 📖 **Need help?** See [GETTING_STARTED.md](GETTING_STARTED.md) for detailed installation instructions

2. **Install Dependencies:**
   ```bash
   # Automated installation (recommended)
   npm run fix
   
   # Or use setup script
   npm run setup
   
   # Or manual
   npm install
   npm run build
   ```

3. **Start the Application:**
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   - 🌐 **Web Application**: http://localhost:8080 ← **Start Here!**
   - 🔌 API Gateway: http://localhost:3000

5. **Login with Demo Account:**
   - **Username:** `testuser` (or email: `test@example.com`)
   - **Password:** `password123`
   
   **OR Register Your Own Account:**
   - Click "Get Started"
   - Fill in your details
   - Start learning immediately!

6. **Explore Features:**
   - Try the Code Explainer with voice assistant
   - Analyze error messages
   - Browse learning paths
   - View your profile

## 🔧 Fixing TypeScript Errors

If you see TypeScript errors like "Cannot find module 'react'":

```bash
# Quick fix - installs all dependencies
npm run fix
```

See [FIX_TYPESCRIPT_ERRORS.md](FIX_TYPESCRIPT_ERRORS.md) for detailed troubleshooting.

## 📋 Current Status

### ✅ Working Components
- **Project Structure**: Complete monorepo with microservices architecture
- **Authentication Service**: JWT-based auth with user registration/login
- **API Gateway**: Request routing and middleware
- **Web Application**: Full-featured React web interface with:
  - User authentication (login/register)
  - Dashboard with quick access to features
  - Code Explainer interface
  - Error Analyzer interface
  - Learning Path browser
  - User profile management
- **Database Integration**: MongoDB and Redis configuration
- **Testing Framework**: Jest with property-based testing (fast-check)
- **Development Tools**: Scripts for development, testing, and health checks

### 🚧 Backend Services In Development
- User profile service (API)
- LLM integration service (OpenAI)
- Code explanation engine (API)
- Error analysis service (API)
- Educational content system (API)

### 📝 Configuration Required
- **OpenAI API Key**: Add to `services/llm-service/.env` for AI features
- **Database URLs**: Update MongoDB/Redis URLs if not using defaults
- **JWT Secrets**: Auto-generated during setup, but can be customized

## Project Structure

This is a monorepo containing multiple microservices and shared packages:

### Packages
- `@codementor/types` - Shared TypeScript types and interfaces
- `@codementor/shared` - Shared utilities, validation, and common functionality

### Services
- `@codementor/api-gateway` - API Gateway with routing and middleware (Port 3000)
- `@codementor/auth-service` - Authentication and user management (Port 3002)
- `@codementor/user-profile-service` - User profiles and preferences (Port 3003)
- `@codementor/code-explainer-service` - Code analysis and explanation (Port 3004)
- `@codementor/error-analyzer-service` - Error analysis and debugging help (Port 3005)
- `@codementor/language-tutor-service` - Educational content and tutorials (Port 3006)
- `@codementor/llm-service` - LLM integration service (Port 3007)
- `@codementor/web-client` - React web application (Port 3001)

## Getting Started

### Quick Start

**For Windows users:**
```cmd
# Run the quick start script
quick-start.bat
```

**For macOS/Linux users:**
```bash
# Run the quick start script
./quick-start.sh
```

**Or use the setup script:**
```bash
npm run setup
```

### Manual Setup

1. **Install Prerequisites:**
   - Node.js 18+ and npm 9+
   - MongoDB (for data persistence)
   - Redis (for caching)
   
   📖 **Detailed installation instructions in [GETTING_STARTED.md](GETTING_STARTED.md)**

2. **Install Dependencies:**
   ```bash
   npm install
   npm run build
   ```

3. **Configure Environment:**
   ```bash
   # Copy environment files
   cp services/auth-service/.env.example services/auth-service/.env
   cp services/api-gateway/.env.example services/api-gateway/.env
   # ... repeat for other services
   ```

4. **Start Services:**
   ```bash
   npm run dev
   ```

5. **Access the Application:**
   - Web Client: http://localhost:8080
   - API Gateway: http://localhost:3000

### Development Commands

```bash
# Start all services in development mode
npm run dev

# Start individual services
npm run dev:gateway  # API Gateway only
npm run dev:client   # Web Client only

# Run tests
npm test             # All tests
npm run test:unit    # Unit tests only
npm run test:property # Property-based tests only

# Health check
npm run health       # Check if all services are running
```

## Architecture

The system follows a microservices architecture with:
- **Service Independence**: Each service manages its own domain logic and data
- **API-First Design**: All inter-service communication through REST APIs
- **Scalable Components**: Individual services can be scaled based on demand
- **Fault Isolation**: Service failures don't cascade to the entire system

## Testing Strategy

The project uses a dual testing approach:
- **Unit Tests**: Test specific examples and edge cases
- **Property-Based Tests**: Test universal properties using fast-check

## Supported Languages

- Python
- JavaScript
- Java
- C++
- HTML/CSS

## 🛠️ Troubleshooting

Having issues? Check these common solutions:

- **Node.js/npm not found**: Install from [nodejs.org](https://nodejs.org/)
- **MongoDB connection failed**: Start MongoDB service or use Docker
- **Redis connection failed**: Start Redis service or use Docker  
- **Port already in use**: Kill existing processes on ports 3000-3007
- **Build failures**: Clear npm cache and reinstall dependencies

📖 **Detailed troubleshooting guide:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 📚 Documentation

### Project Documentation
- [docs/README.md](docs/README.md) - **📁 Documentation overview and navigation**
- [docs/requirements/requirements.md](docs/requirements/requirements.md) - **📋 System requirements and acceptance criteria**
- [docs/design/design.md](docs/design/design.md) - **🏗️ System architecture and design specifications**

### Getting Started
- [GETTING_STARTED.md](GETTING_STARTED.md) - Detailed setup instructions
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues and solutions
- [FIX_TYPESCRIPT_ERRORS.md](FIX_TYPESCRIPT_ERRORS.md) - **🔧 Fix TypeScript errors**

### Deployment Guides
- [DEPLOYMENT_FILES_SUMMARY.md](DEPLOYMENT_FILES_SUMMARY.md) - **📦 Overview of all deployment files**
- [BACKEND_QUICK_START.md](BACKEND_QUICK_START.md) - **⚡ Start backend with AI in 5 minutes**
- [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) - **🚂 Deploy backend to Railway**
- [LOCALHOST_TO_LIVE.md](LOCALHOST_TO_LIVE.md) - **🌐 Complete journey from localhost to live**
- [LIVE_DEPLOYMENT_QUICK_START.md](LIVE_DEPLOYMENT_QUICK_START.md) - **⚡ 5-minute quick start**
- [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md) - **🚀 Vercel deployment guide**
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - **📖 Complete deployment options**
- [DEPLOYMENT_STEPS_VISUAL.md](DEPLOYMENT_STEPS_VISUAL.md) - **📸 Visual step-by-step guide**
- [GO_LIVE_CHECKLIST.md](GO_LIVE_CHECKLIST.md) - **✅ Pre-deployment checklist**

### Features & Usage
- [DEMO_MODE_GUIDE.md](DEMO_MODE_GUIDE.md) - **🎮 Demo mode usage guide**
- [DEMO_EXAMPLES.md](DEMO_EXAMPLES.md) - **📋 Demo examples and reference**
- [WEB_APPLICATION_SUMMARY.md](WEB_APPLICATION_SUMMARY.md) - Web app features and usage
- [FEATURES.md](FEATURES.md) - Complete feature overview
- [DEPLOYMENT_READY.md](DEPLOYMENT_READY.md) - **🎉 Application ready guide**

### Technical Documentation
- [SETUP_SUMMARY.md](SETUP_SUMMARY.md) - Technical implementation details
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick command reference
- [COMMANDS.md](COMMANDS.md) - **⚡ All commands in one place**
- [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md) - **🔑 API keys setup for live features**
- [API_KEY_SETUP_COMPLETE.md](API_KEY_SETUP_COMPLETE.md) - **✅ API key configuration complete**
- `.kiro/specs/code-mentor-ai/` - Feature specifications and tasks

## 🌐 Using the Web Application

The web application is now fully functional! Here's what you can do:

### Features Available Now:
1. **User Registration & Login** - Create an account and sign in
2. **Dashboard** - View your progress and access all features
3. **Code Explainer** - Paste code and get explanations (demo mode)
4. **Error Analyzer** - Analyze error messages (demo mode)
5. **Learning Paths** - Browse available programming languages
6. **Profile Management** - View and edit your profile

### Quick Start:
```bash
# Start all services
npm run dev

# Open your browser
http://localhost:8080

# Create an account and start exploring!
```

See [WEB_APPLICATION_SUMMARY.md](WEB_APPLICATION_SUMMARY.md) for complete details.

## Development Status

This project is currently under development. Services are being implemented incrementally according to the implementation plan in `.kiro/specs/code-mentor-ai/tasks.md`.

## 👥 Development Team

**Akash Kumar** - Frontend Developer • AI Engineer • Prompt Engineer  
Frontend & AI Developer  
Frontend development, UI/UX design, AI prompt engineering, and intelligent feature integration.

**Shudanshu Kumar** - Backend & Full-Stack Developer  
Full-Stack Developer  
Backend services, APIs, database handling, and system logic implementation.

## 🚀 Deploy to Production

Ready to make your app live? We've got you covered!

### ⚡ Backend Services (NEW!)

**Install and start backend with AI:**

```cmd
# Install backend dependencies
install-backend.bat

# Start all services
npm run start:services
```

**Test AI features:**
```
http://localhost:3007/health (LLM Service)
http://localhost:3004/health (Code Explainer)
http://localhost:3005/health (Error Analyzer)
```

📖 **Backend guides:**
- [BACKEND_QUICK_START.md](BACKEND_QUICK_START.md) - **⚡ Start backend in 5 minutes**
- [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) - **🚂 Deploy backend to Railway**

### ⚡ Frontend Deployment

**Automated deployment script:**

```bash
# Windows
deploy.bat

# macOS/Linux
./deploy.sh
```

Or manually:

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Deploy CodeMentor AI"
git push origin main

# 2. Go to vercel.com and import your repo
# 3. Your app is LIVE! 🎉
```

📖 **Frontend guides:**
- [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md) - Quick Vercel deployment (5 min)
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete deployment options
- [GO_LIVE_CHECKLIST.md](GO_LIVE_CHECKLIST.md) - Pre-deployment checklist

### 🌐 Deployment Options

**Platforms covered:**
- ✅ **Railway** (Backend - $20/mo, Recommended)
- ✅ **Vercel** (Frontend - Free, Recommended)
- ✅ **Netlify** (Frontend - Free)
- ✅ **Render** (Full Stack - Free tier)
- ✅ Custom domain setup
- ✅ Environment configuration

### 🎯 What You Get

**Demo Mode (Free):**
- ✅ User registration & login
- ✅ All UI features
- ✅ Voice assistant
- ✅ Auto language detection
- ✅ Works without backend!

**Full Mode (With Backend - $20/mo):**
- ✅ Real AI explanations (Google AI)
- ✅ Real AI error analysis
- ✅ Persistent user data (MongoDB)
- ✅ Advanced features
- ✅ Production-ready

---

## License

[Add your license here]
