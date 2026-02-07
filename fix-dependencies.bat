@echo off
echo 🔧 Fixing CodeMentor AI Dependencies
echo.

echo 📦 Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

echo.
echo 📦 Installing package dependencies...
cd packages\types
call npm install
cd ..\..

cd packages\shared
call npm install
cd ..\..

echo.
echo 🔨 Building packages...
cd packages\types
call npm run build
cd ..\..

cd packages\shared
call npm run build
cd ..\..

echo.
echo 📦 Installing web-client dependencies...
cd services\web-client
call npm install
cd ..\..

echo.
echo 📦 Installing other service dependencies...
cd services\api-gateway
call npm install
cd ..\..

cd services\auth-service
call npm install
cd ..\..

echo.
echo ✅ All dependencies installed successfully!
echo.
echo 📝 Next steps:
echo 1. Run: npm run dev
echo 2. Visit: http://localhost:3001
echo.
pause
