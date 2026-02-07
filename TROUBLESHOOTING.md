# Troubleshooting Guide

## Common Setup Issues

### 1. Node.js/npm Not Found

**Error:** `'npm' is not recognized as the name of a cmdlet, function, script file, or operable program`

**Solution:**
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Choose the LTS version (18.x or higher)
3. Restart your terminal/command prompt after installation
4. Verify installation: `node --version` and `npm --version`

### 2. MongoDB Connection Issues

**Error:** `MongoNetworkError: failed to connect to server`

**Solutions:**
- **Windows:** Start MongoDB service
  ```cmd
  net start MongoDB
  ```
- **macOS:** Start MongoDB with Homebrew
  ```bash
  brew services start mongodb/brew/mongodb-community
  ```
- **Linux:** Start MongoDB service
  ```bash
  sudo systemctl start mongod
  ```
- **Docker:** Run MongoDB in container
  ```bash
  docker run -d -p 27017:27017 --name mongodb mongo:latest
  ```

### 3. Redis Connection Issues

**Error:** `Error: Redis connection to localhost:6379 failed`

**Solutions:**
- **Windows:** Install and start Redis
  ```cmd
  # Using Docker (recommended)
  docker run -d -p 6379:6379 --name redis redis:alpine
  ```
- **macOS:** Start Redis with Homebrew
  ```bash
  brew services start redis
  ```
- **Linux:** Start Redis service
  ```bash
  sudo systemctl start redis-server
  ```

### 4. Port Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solutions:**
- **Windows:** Find and kill process
  ```cmd
  netstat -ano | findstr :3000
  taskkill /PID <PID_NUMBER> /F
  ```
- **macOS/Linux:** Kill process on port
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

### 5. Permission Errors

**Error:** `EACCES: permission denied`

**Solutions:**
- **Windows:** Run terminal as Administrator
- **macOS/Linux:** Use sudo for global installations
  ```bash
  sudo npm install -g <package>
  ```
- Or configure npm to use a different directory:
  ```bash
  npm config set prefix ~/.npm-global
  export PATH=~/.npm-global/bin:$PATH
  ```

### 6. Build Failures

**Error:** `npm run build` fails

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
2. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Check TypeScript errors:
   ```bash
   npm run type-check
   ```

### 7. Environment Variables Not Loading

**Error:** Services can't connect to each other

**Solutions:**
1. Ensure all `.env` files are created:
   ```bash
   # Run setup script
   npm run setup
   ```
2. Check environment file format (no spaces around =):
   ```env
   # Correct
   PORT=3000
   
   # Incorrect
   PORT = 3000
   ```
3. Restart services after changing environment files

### 8. OpenAI API Issues

**Error:** `Invalid API key` or `Rate limit exceeded`

**Solutions:**
1. Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to `services/llm-service/.env`:
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
3. Check your OpenAI account billing and usage limits

### 9. CORS Errors in Browser

**Error:** `Access to fetch at 'http://localhost:3000' from origin 'http://localhost:3001' has been blocked by CORS policy`

**Solutions:**
1. Check ALLOWED_ORIGINS in `.env` files
2. Ensure API Gateway is running on port 3000
3. Verify CORS configuration in API Gateway

### 10. JWT Token Issues

**Error:** `JsonWebTokenError: invalid token`

**Solutions:**
1. Ensure JWT_SECRET is the same in auth service and API gateway
2. Check token expiration settings
3. Clear browser localStorage/cookies
4. Generate new JWT secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

## Service-Specific Issues

### Authentication Service (Port 3002)

**Common Issues:**
- Database connection failures
- JWT secret not configured
- Password hashing errors

**Debug Steps:**
1. Check MongoDB connection
2. Verify JWT_SECRET in `.env`
3. Check logs: `cd services/auth-service && npm run dev`

### API Gateway (Port 3000)

**Common Issues:**
- Service proxy failures
- Rate limiting issues
- Authentication middleware errors

**Debug Steps:**
1. Check all service URLs in `.env`
2. Verify services are running on correct ports
3. Test individual service endpoints

### Web Client (Port 3001)

**Common Issues:**
- Build failures
- API connection issues
- Environment variables not loading

**Debug Steps:**
1. Check React build process
2. Verify API_URL configuration
3. Check browser console for errors

## Development Tips

### 1. Check Service Health

```bash
# Check if all services are responding
npm run health

# Or manually check each service
curl http://localhost:3000/health  # API Gateway
curl http://localhost:3002/health  # Auth Service
# ... etc
```

### 2. View Service Logs

```bash
# Start services individually to see logs
cd services/auth-service
npm run dev

# Or use PM2 for better log management
npm install -g pm2
pm2 start ecosystem.config.js
pm2 logs
```

### 3. Database Debugging

```bash
# Connect to MongoDB
mongo mongodb://localhost:27017/codementor-auth

# Connect to Redis
redis-cli
```

### 4. Network Debugging

```bash
# Check which ports are in use
netstat -tulpn | grep LISTEN  # Linux/macOS
netstat -an | findstr LISTEN   # Windows

# Test service connectivity
telnet localhost 3000
```

## Getting Help

If you're still having issues:

1. **Check the logs** - Most errors will show detailed information in the service logs
2. **Verify prerequisites** - Ensure Node.js, MongoDB, and Redis are properly installed
3. **Check environment configuration** - Verify all `.env` files are properly configured
4. **Test individual components** - Start services one by one to isolate issues
5. **Review the setup guide** - Double-check steps in `GETTING_STARTED.md`

## Reporting Issues

When reporting issues, please include:

1. Operating system and version
2. Node.js and npm versions
3. Complete error message
4. Steps to reproduce
5. Environment configuration (without sensitive data)
6. Service logs (if applicable)

This information helps diagnose and resolve issues quickly.