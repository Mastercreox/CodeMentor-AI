@echo off
echo ========================================
echo   Pushing CodeMentor AI to GitHub
echo ========================================
echo.

REM Set Git editor to avoid interactive prompts
set GIT_EDITOR=notepad

echo Step 1: Checking current status...
git status

echo.
echo Step 2: Pulling latest changes with merge strategy...
git pull origin main --no-edit

echo.
echo Step 3: Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo   Upload Complete!
echo ========================================
echo.
echo Your code is now at:
echo https://github.com/Mastercreox/CodeMentor-AI
echo.
pause
