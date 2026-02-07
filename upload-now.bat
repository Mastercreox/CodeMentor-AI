@echo off
echo.
echo ========================================
echo   CodeMentor AI - GitHub Upload
echo ========================================
echo.
echo Repository: https://github.com/Mastercreox/CodeMentor-AI
echo.
echo This will upload your code to GitHub.
echo.
pause

echo.
echo [1/3] Cleaning up any pending operations...
git rebase --abort 2>nul
git merge --abort 2>nul
git reset --hard HEAD

echo.
echo [2/3] Committing any new changes...
git add .
git commit -m "Update CodeMentor AI - Complete documentation and implementation" 2>nul

echo.
echo [3/3] Uploading to GitHub...
git push origin main --force

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo   ✅ SUCCESS! Code uploaded to GitHub
    echo ========================================
    echo.
    echo View your repository at:
    echo https://github.com/Mastercreox/CodeMentor-AI
    echo.
) else (
    echo ========================================
    echo   ⚠️  Upload encountered an issue
    echo ========================================
    echo.
    echo Please check the error message above.
    echo You may need to authenticate with GitHub.
    echo.
)

pause
