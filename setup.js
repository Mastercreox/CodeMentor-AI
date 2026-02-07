#!/usr/bin/env node

/**
 * Setup script for CodeMentor AI
 * Helps users configure the project for first-time use
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 CodeMentor AI Setup Script\n');

// Check if Node.js and npm are available
function checkPrerequisites() {
  console.log('📋 Checking prerequisites...');
  
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    
    console.log(`✅ Node.js: ${nodeVersion}`);
    console.log(`✅ npm: ${npmVersion}`);
    
    // Check if versions meet requirements
    const nodeVersionNum = parseInt(nodeVersion.replace('v', '').split('.')[0]);
    if (nodeVersionNum < 18) {
      console.log('⚠️  Warning: Node.js 18+ is recommended');
    }
    
  } catch (error) {
    console.log('❌ Node.js or npm not found. Please install Node.js first.');
    console.log('📖 See GETTING_STARTED.md for installation instructions.');
    process.exit(1);
  }
}

// Check if MongoDB and Redis are available
function checkDatabases() {
  console.log('\n🗄️  Checking databases...');
  
  // Check MongoDB
  try {
    execSync('mongod --version', { stdio: 'ignore' });
    console.log('✅ MongoDB found');
  } catch (error) {
    console.log('⚠️  MongoDB not found - you\'ll need to install it');
  }
  
  // Check Redis
  try {
    execSync('redis-server --version', { stdio: 'ignore' });
    console.log('✅ Redis found');
  } catch (error) {
    console.log('⚠️  Redis not found - you\'ll need to install it');
  }
}

// Copy environment files
function setupEnvironmentFiles() {
  console.log('\n📝 Setting up environment files...');
  
  const services = [
    'api-gateway',
    'auth-service',
    'user-profile-service',
    'code-explainer-service',
    'error-analyzer-service',
    'language-tutor-service',
    'llm-service',
    'web-client'
  ];
  
  services.forEach(service => {
    const examplePath = path.join('services', service, '.env.example');
    const envPath = path.join('services', service, '.env');
    
    if (fs.existsSync(examplePath)) {
      if (!fs.existsSync(envPath)) {
        fs.copyFileSync(examplePath, envPath);
        console.log(`✅ Created ${envPath}`);
      } else {
        console.log(`⏭️  ${envPath} already exists`);
      }
    }
  });
}

// Install dependencies
function installDependencies() {
  console.log('\n📦 Installing dependencies...');
  
  try {
    console.log('Installing root dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('Building shared packages...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.log('❌ Failed to install dependencies');
    console.log('Try running: npm install');
    process.exit(1);
  }
}

// Generate default configuration
function generateDefaultConfig() {
  console.log('\n⚙️  Generating default configuration...');
  
  // Generate a random JWT secret
  const jwtSecret = require('crypto').randomBytes(64).toString('hex');
  
  // Update auth service .env with generated secret
  const authEnvPath = path.join('services', 'auth-service', '.env');
  if (fs.existsSync(authEnvPath)) {
    let envContent = fs.readFileSync(authEnvPath, 'utf8');
    envContent = envContent.replace(
      'JWT_SECRET=your-super-secret-jwt-key-change-this-in-production',
      `JWT_SECRET=${jwtSecret}`
    );
    fs.writeFileSync(authEnvPath, envContent);
    console.log('✅ Generated JWT secret for auth service');
  }
}

// Main setup function
async function main() {
  try {
    checkPrerequisites();
    checkDatabases();
    setupEnvironmentFiles();
    installDependencies();
    generateDefaultConfig();
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📖 Next steps:');
    console.log('1. Start MongoDB and Redis services');
    console.log('2. Configure your OpenAI API key in services/llm-service/.env');
    console.log('3. Run: npm run dev');
    console.log('4. Visit: http://localhost:3001');
    console.log('\n📚 For detailed instructions, see GETTING_STARTED.md');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = { main };