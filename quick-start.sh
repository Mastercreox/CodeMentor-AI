#!/bin/bash

echo "🚀 CodeMentor AI Quick Start (macOS/Linux)"
echo

echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "🔧 Building packages..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build packages"
    exit 1
fi

echo "📝 Setting up environment files..."
for service in api-gateway auth-service user-profile-service code-explainer-service error-analyzer-service language-tutor-service llm-service web-client; do
    if [ -f "services/$service/.env.example" ] && [ ! -f "services/$service/.env" ]; then
        cp "services/$service/.env.example" "services/$service/.env"
        echo "✅ Created services/$service/.env"
    fi
done

echo
echo "✅ Setup complete!"
echo
echo "📖 Next steps:"
echo "1. Make sure MongoDB and Redis are running"
echo "2. Configure your OpenAI API key in services/llm-service/.env"
echo "3. Run: npm run dev"
echo "4. Visit: http://localhost:3001"
echo
echo "📚 For detailed setup instructions, see GETTING_STARTED.md"