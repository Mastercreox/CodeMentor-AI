#!/usr/bin/env node

/**
 * Fix Dependencies Script
 * Installs all required dependencies for the CodeMentor AI project
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing CodeMentor AI Dependencies\n');

function runCommand(command, cwd = '.') {
  try {
    console.log(`Running: ${command} in ${cwd}`);
    execSync(command, { 
      cwd, 
      stdio: 'inherit',
      shell: true 
    });
    return true;
  } catch (error) {
    console.error(`❌ Failed to run: ${command}`);
    return false;
  }
}

// Step 1: Install root dependencies
console.log('\n📦 Step 1: Installing root dependencies...');
runCommand('npm install');

// Step 2: Install package dependencies
console.log('\n📦 Step 2: Installing shared package dependencies...');
const packages = ['packages/types', 'packages/shared'];
packages.forEach(pkg => {
  if (fs.existsSync(pkg)) {
    runCommand('npm install', pkg);
  }
});

// Step 3: Build packages
console.log('\n🔨 Step 3: Building shared packages...');
packages.forEach(pkg => {
  if (fs.existsSync(pkg)) {
    runCommand('npm run build', pkg);
  }
});

// Step 4: Install service dependencies
console.log('\n📦 Step 4: Installing service dependencies...');
const services = [
  'services/api-gateway',
  'services/auth-service',
  'services/user-profile-service',
  'services/code-explainer-service',
  'services/error-analyzer-service',
  'services/language-tutor-service',
  'services/llm-service',
  'services/web-client'
];

services.forEach(service => {
  if (fs.existsSync(service)) {
    console.log(`\n📦 Installing ${service}...`);
    runCommand('npm install', service);
  }
});

console.log('\n✅ All dependencies installed successfully!');
console.log('\n' + '='.repeat(60));
console.log('🎉  CodeMentor AI - Ready to Run!');
console.log('='.repeat(60));
console.log('\n📝 Next steps:');
console.log('   1. Restart your IDE (VS Code, etc.)');
console.log('   2. Run: npm run dev');
console.log('   3. Visit: http://localhost:8080');
console.log('\n💡 Tip: If you still see TypeScript errors, restart your IDE!');
console.log('='.repeat(60) + '\n');
