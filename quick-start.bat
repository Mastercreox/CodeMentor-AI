@echo off
echo 🚀 CodeMentor AI Quick Start (Windows)
echo.

echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo 🔧 Building packages...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build packages
    pause
    exit /b 1
)

echo 📝 Setting up environment files...
if not exist "services\auth-service\.env" (
    copy "services\auth-service\.env.example" "services\auth-service\.env"
)
if not exist "services\api-gateway\.env" (
    copy "services\api-gateway\.env.example" "services\api-gateway\.env"
)

echo.
echo ✅ Setup complete!
echo.
echo 📖 Next steps:
echo 1. Make sure MongoDB and Redis are running
echo 2. Configure your OpenAI API key in services\llm-service\.env
echo 3. Run: npm run dev
echo 4. Visit: http://localhost:3001
echo.
echo 📚 For detailed setup instructions, see GETTING_STARTED.md
echo.
pause