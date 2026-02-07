@echo off
echo.
echo ========================================
echo   Installing Backend Dependencies
echo ========================================
echo.

echo [1/4] Installing LLM Service...
cd services\llm-service
call npm install @google/generative-ai axios dotenv cors helmet
call npm install
cd ..\..

echo.
echo [2/4] Installing Code Explainer Service...
cd services\code-explainer-service
call npm install axios dotenv cors helmet
call npm install
cd ..\..

echo.
echo [3/4] Installing Error Analyzer Service...
cd services\error-analyzer-service
call npm install axios dotenv cors helmet
call npm install
cd ..\..

echo.
echo [4/4] Installing API Gateway...
cd services\api-gateway
call npm install
cd ..\..

echo.
echo ========================================
echo   Building Services
echo ========================================
echo.

echo Building LLM Service...
cd services\llm-service
call npm run build
cd ..\..

echo Building Code Explainer Service...
cd services\code-explainer-service
call npm run build
cd ..\..

echo Building Error Analyzer Service...
cd services\error-analyzer-service
call npm run build
cd ..\..

echo Building API Gateway...
cd services\api-gateway
call npm run build
cd ..\..

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Start services: npm run start:services
echo 2. Test health: curl http://localhost:3007/health
echo 3. Deploy to Railway: See RAILWAY_DEPLOYMENT.md
echo.
pause
