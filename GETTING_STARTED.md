# Getting Started with CodeMentor AI

## Prerequisites Installation

Before you can run CodeMentor AI, you need to install the following prerequisites:

### 1. Install Node.js and npm

**Windows:**
1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Choose the LTS version (recommended)
3. Run the installer and follow the setup wizard
4. This will install both Node.js and npm

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org
```

**Linux (Ubuntu/Debian):**
```bash
# Using NodeSource repository (recommended)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using snap
sudo snap install node --classic
```

**Verify Installation:**
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

### 2. Install Database Dependencies

**MongoDB (Required for data persistence):**

**Windows:**
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Start MongoDB service

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**Linux:**
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Redis (Required for caching):**

**Windows:**
1. Download Redis from [redis.io](https://redis.io/download) or use WSL
2. Or use Docker: `docker run -d -p 6379:6379 redis:alpine`

**macOS:**
```bash
brew install redis
brew services start redis
```

**Linux:**
```bash
sudo apt-get install redis-server
sudo systemctl start redis-server
```

## Project Setup

### 1. Install Dependencies

```bash
# Install all dependencies for the monorepo
npm install

# Build shared packages
npm run build
```

### 2. Environment Configuration

Copy environment files and configure them:

```bash
# Copy environment templates
cp services/api-gateway/.env.example services/api-gateway/.env
cp services/auth-service/.env.example services/auth-service/.env
cp services/user-profile-service/.env.example services/user-profile-service/.env
cp services/code-explainer-service/.env.example services/code-explainer-service/.env
cp services/error-analyzer-service/.env.example services/error-analyzer-service/.env
cp services/language-tutor-service/.env.example services/language-tutor-service/.env
cp services/llm-service/.env.example services/llm-service/.env
cp services/web-client/.env.example services/web-client/.env
```

### 3. Configure Environment Variables

Edit the `.env` files with your specific configuration:

**services/auth-service/.env:**
```env
PORT=3002
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/codementor-auth
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
REDIS_URL=redis://localhost:6379
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

**services/llm-service/.env:**
```env
PORT=3007
NODE_ENV=development
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-3.5-turbo
MAX_TOKENS=2000
TEMPERATURE=0.7
```

**Other services:** Update MongoDB and Redis URLs as needed.

## Running the Application

### Option 1: Start All Services (Recommended)

```bash
# Start all services in development mode
npm run dev
```

This will start:
- API Gateway on http://localhost:3000
- Web Client on http://localhost:3001
- Auth Service on http://localhost:3002
- All other microservices on their respective ports

### Option 2: Start Services Individually

```bash
# Start API Gateway only
npm run dev:gateway

# Start Web Client only
npm run dev:client

# Start specific service
cd services/auth-service
npm run dev
```

### Health Check

```bash
# Check if all services are running
npm run health
```

## Testing

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run property-based tests only
npm run test:property

# Run tests for specific service
cd services/auth-service
npm test
```

## Development Status

### ✅ Currently Working
- Project structure and monorepo setup
- Authentication service with JWT
- API Gateway with routing
- Basic testing framework

### 🚧 In Progress
- User profile service
- LLM integration
- Code explanation service

### 📋 Planned
- Error analysis service
- Language tutorial service
- Web client interface
- Complete integration

## Troubleshooting

### Common Issues

**1. Port Already in Use:**
```bash
# Kill process on specific port (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on specific port (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

**2. MongoDB Connection Issues:**
- Ensure MongoDB is running: `mongod --version`
- Check connection string in `.env` files
- Verify MongoDB service is started

**3. Redis Connection Issues:**
- Ensure Redis is running: `redis-cli ping`
- Check Redis URL in `.env` files
- Verify Redis service is started

**4. npm install fails:**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

### Getting Help

1. Check the logs in your terminal for specific error messages
2. Verify all prerequisites are installed and running
3. Ensure all environment variables are properly configured
4. Check that all required ports are available

## Next Steps

Once you have the basic setup running:

1. **Configure LLM Service**: Add your OpenAI API key to enable AI features
2. **Test Authentication**: Try registering and logging in through the API
3. **Explore Services**: Each service has its own README with specific details
4. **Contribute**: Check the tasks.md file for implementation progress

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │   API Gateway   │
│   (Port 3001)   │◄──►│   (Port 3000)   │
└─────────────────┘    └─────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │ Auth Service │ │User Profile │ │    LLM    │
        │ (Port 3002)  │ │(Port 3003)  │ │(Port 3007)│
        └──────────────┘ └─────────────┘ └───────────┘
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │Code Explainer│ │Error Analyzer│ │Lang Tutor │
        │ (Port 3004)  │ │(Port 3005)  │ │(Port 3006)│
        └──────────────┘ └─────────────┘ └───────────┘
                │               │               │
                └───────────────┼───────────────┘
                                │
                        ┌───────▼──────┐
                        │   Database   │
                        │ MongoDB/Redis│
                        └──────────────┘
```

This setup provides a scalable microservices architecture where each service can be developed, tested, and deployed independently.