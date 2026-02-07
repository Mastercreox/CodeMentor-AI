#!/usr/bin/env node

/**
 * Port Detection Script
 * Detects available ports and checks current configuration
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Detecting Port Configuration...\n');

// Ports to check
const portsToCheck = [3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 8080, 8081, 9000];

function checkPort(port) {
  try {
    // Windows command
    if (process.platform === 'win32') {
      const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
      return result.trim().length > 0;
    } else {
      // macOS/Linux command
      const result = execSync(`lsof -i :${port}`, { encoding: 'utf8' });
      return result.trim().length > 0;
    }
  } catch (error) {
    // Port is free if command fails
    return false;
  }
}

function getCurrentConfig() {
  const envPath = path.join('services', 'web-client', '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/PORT=(\d+)/);
    return match ? parseInt(match[1]) : null;
  }
  return null;
}

function findAvailablePort(startPort = 8080) {
  for (let port = startPort; port < startPort + 100; port++) {
    if (!checkPort(port)) {
      return port;
    }
  }
  return null;
}

// Main detection
console.log('📊 Port Status:\n');
console.log('Port  | Status      | Service');
console.log('------|-------------|------------------');

const portStatus = {};
portsToCheck.forEach(port => {
  const inUse = checkPort(port);
  portStatus[port] = inUse;
  
  let service = '';
  if (port === 3000) service = 'API Gateway';
  else if (port === 3001) service = 'Web Client (default)';
  else if (port === 3002) service = 'Auth Service';
  else if (port === 3003) service = 'User Profile';
  else if (port === 3004) service = 'Code Explainer';
  else if (port === 3005) service = 'Error Analyzer';
  else if (port === 3006) service = 'Language Tutor';
  else if (port === 3007) service = 'LLM Service';
  else if (port === 8080) service = 'Web Client (configured)';
  
  const status = inUse ? '❌ IN USE' : '✅ FREE';
  console.log(`${port.toString().padEnd(6)}| ${status.padEnd(12)}| ${service}`);
});

// Check current configuration
console.log('\n📝 Current Configuration:\n');
const currentPort = getCurrentConfig();
if (currentPort) {
  console.log(`Web Client Port: ${currentPort}`);
  const isAvailable = !checkPort(currentPort);
  if (isAvailable) {
    console.log(`Status: ✅ Port ${currentPort} is available`);
  } else {
    console.log(`Status: ❌ Port ${currentPort} is already in use!`);
    const alternative = findAvailablePort(currentPort);
    if (alternative) {
      console.log(`\n💡 Suggestion: Use port ${alternative} instead`);
      console.log(`   Update services/web-client/.env:`);
      console.log(`   PORT=${alternative}`);
    }
  }
} else {
  console.log('⚠️  No .env file found in services/web-client/');
  console.log('   Run: npm run setup');
}

// Recommendations
console.log('\n🎯 Recommendations:\n');

if (portStatus[8080]) {
  console.log('❌ Port 8080 is in use');
  const alternative = findAvailablePort(8080);
  if (alternative) {
    console.log(`   ✅ Port ${alternative} is available`);
    console.log(`   Update services/web-client/.env to use PORT=${alternative}`);
  }
} else {
  console.log('✅ Port 8080 is available - you can use it!');
}

if (portStatus[3000]) {
  console.log('❌ Port 3000 (API Gateway) is in use');
  console.log('   You may need to stop the process or use a different port');
} else {
  console.log('✅ Port 3000 (API Gateway) is available');
}

// Show how to access
console.log('\n🌐 Your Application URLs:\n');
if (currentPort && !checkPort(currentPort)) {
  console.log(`   Web Application: http://localhost:${currentPort}`);
} else if (!portStatus[8080]) {
  console.log(`   Web Application: http://localhost:8080`);
} else {
  const alt = findAvailablePort(8080);
  console.log(`   Web Application: http://localhost:${alt} (suggested)`);
}
console.log(`   API Gateway:     http://localhost:3000`);

console.log('\n💡 Tips:\n');
console.log('   • To free a port, stop the process using it');
console.log('   • To change port, edit services/web-client/.env');
console.log('   • Run this script anytime: node detect-ports.js');

console.log('\n' + '='.repeat(60));
