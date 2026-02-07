# CodeMentor AI - Quick Reference Card

## 🚀 Essential Commands

```bash
# Fix TypeScript Errors
npm run fix               # Fix all dependency issues ⚡

# Setup (First Time)
npm run setup              # Automated setup
npm run status             # Check project status

# Development
npm run dev                # Start all services
npm run health             # Check service health

# Testing
npm test                   # Run all tests
npm run test:unit          # Unit tests only
npm run test:property      # Property tests only

# Building
npm run build              # Build all packages
npm run type-check         # TypeScript check
npm run lint               # Lint code
```

## 🌐 URLs

```
Web Application:  http://localhost:8080  ← Main App
API Gateway:      http://localhost:3000
Auth Service:     http://localhost:3002
User Profile:     http://localhost:3003
Code Explainer:   http://localhost:3004
Error Analyzer:   http://localhost:3005
Language Tutor:   http://localhost:3006
LLM Service:      http://localhost:3007
```

## 📁 Key Files

```
Configuration:
├── .env files                    # Service configuration
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config

Documentation:
├── README.md                     # Main readme
├── DEPLOYMENT_READY.md           # Ready guide
├── GETTING_STARTED.md            # Setup guide
├── FEATURES.md                   # Feature list
└── TROUBLESHOOTING.md            # Problem solving

Application:
├── services/web-client/          # React app
├── services/auth-service/        # Authentication
├── services/api-gateway/         # API routing
└── packages/                     # Shared code
```

## 🎯 User Features

```
✅ Available Now:
• User Registration
• User Login
• Dashboard
• Code Explainer (UI)
• Error Analyzer (UI)
• Learning Paths (UI)
• Profile Management

🔄 Demo Mode:
• Code Explanations
• Error Analysis
• Learning Content
```

## 🔧 Troubleshooting Quick Fixes

```bash
# Port in use
netstat -ano | findstr :3000    # Windows
lsof -ti:3000 | xargs kill -9   # Mac/Linux

# MongoDB not running
net start MongoDB               # Windows
brew services start mongodb     # Mac
sudo systemctl start mongod     # Linux

# Redis not running
# Use Docker:
docker run -d -p 6379:6379 redis:alpine

# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📊 Project Status

```
✅ Complete:
• Project structure
• Authentication service
• API Gateway
• Web application
• User interface
• Documentation

🔄 In Development:
• User profile API
• LLM integration
• Code explainer API
• Error analyzer API
• Learning content API
```

## 🎓 Getting Started (3 Steps)

```
1. Setup:
   npm run setup

2. Start:
   npm run dev

3. Use:
   http://localhost:3001
   → Register
   → Login
   → Explore!
```

## 💡 Tips

```
• Check status before starting: npm run status
• Monitor health while running: npm run health
• Read DEPLOYMENT_READY.md for full details
• Check TROUBLESHOOTING.md if issues arise
• See FEATURES.md for feature details
```

## 🆘 Need Help?

```
1. Check TROUBLESHOOTING.md
2. Run: npm run status
3. Run: npm run health
4. Check service logs
5. Review documentation
```

## 📞 Quick Links

```
Setup Guide:      GETTING_STARTED.md
Ready Guide:      DEPLOYMENT_READY.md
Features:         FEATURES.md
Troubleshooting:  TROUBLESHOOTING.md
Web App Details:  WEB_APPLICATION_SUMMARY.md
```

---

**Remember:** The web application is ready to use NOW!
Just run `npm run dev` and visit http://localhost:3001 🚀
