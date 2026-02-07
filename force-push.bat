@echo off
echo ========================================
echo   Force Pushing to GitHub
echo ========================================
echo.
echo WARNING: This will overwrite remote repository
echo with your local version.
echo.
echo Press Ctrl+C to cancel, or
pause

echo.
echo Resetting any pending operations...
git reset --hard HEAD

echo.
echo Force pushing to GitHub...
git push origin main --force

echo.
echo ========================================
echo   Upload Complete!
echo ========================================
echo.
echo Your code is now at:
echo https://github.com/Mastercreox/CodeMentor-AI
echo.
pause
