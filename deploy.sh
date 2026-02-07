#!/bin/bash

echo ""
echo "========================================"
echo "  CodeMentor AI - Quick Deploy Script"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "[1/4] Initializing Git repository..."
    git init
    git branch -M main
else
    echo "[1/4] Git repository already initialized"
fi

echo ""
echo "[2/4] Adding files to Git..."
git add .

echo ""
echo "[3/4] Creating commit..."
git commit -m "Deploy CodeMentor AI to production"

echo ""
echo "[4/4] Ready to push!"
echo ""
echo "========================================"
echo "  NEXT STEPS:"
echo "========================================"
echo ""
echo "1. Create a GitHub repository at:"
echo "   https://github.com/new"
echo ""
echo "2. Copy the repository URL (e.g., https://github.com/username/codementor-ai.git)"
echo ""
echo "3. Run this command (replace with your URL):"
echo "   git remote add origin YOUR_GITHUB_URL"
echo "   git push -u origin main"
echo ""
echo "4. Go to https://vercel.com and:"
echo "   - Sign up with GitHub"
echo "   - Import your repository"
echo "   - Set Root Directory: services/web-client"
echo "   - Click Deploy"
echo ""
echo "5. Your app will be LIVE in 2-3 minutes!"
echo ""
echo "========================================"
echo "  NEED HELP?"
echo "========================================"
echo ""
echo "Read: VERCEL_DEPLOY.md for step-by-step guide"
echo "Read: DEPLOYMENT_GUIDE.md for all deployment options"
echo ""
echo "========================================"
echo ""
