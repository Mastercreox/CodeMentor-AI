#!/usr/bin/env node

/**
 * Development script to start all services
 * This script helps coordinate the startup of multiple services
 */

const { spawn } = require('child_process');
const path = require('path');

const services = [
  { name: 'API Gateway', path: 'services/api-gateway', port: 3000 },
  { name: 'Web Client', path: 'services/web-client', port: 8080 },
  { name: 'Auth Service', path: 'services/auth-service', port: 3002 },
  { name: 'User Profile Service', path: 'services/user-profile-service', port: 3003 },
  { name: 'Code Explainer Service', path: 'services/code-explainer-service', port: 3004 },
  { name: 'Error Analyzer Service', path: 'services/error-analyzer-service', port: 3005 },
  { name: 'Language Tutor Service', path: 'services/language-tutor-service', port: 3006 },
  { name: 'LLM Service', path: 'services/llm-service', port: 3007 }
];

console.log('🚀 Starting CodeMentor AI Development Environment\n');

// Start each service
services.forEach(service => {
  console.log(`Starting ${service.name} on port ${service.port}...`);
  
  const child = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, '..', service.path),
    stdio: 'inherit',
    shell: true
  });

  child.on('error', (error) => {
    console.error(`❌ Failed to start ${service.name}:`, error.message);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ ${service.name} exited with code ${code}`);
    }
  });
});

console.log('\n✅ All services started!');
console.log('📝 Check individual service logs above for startup status');
console.log('🌐 Web Client: http://localhost:8080');
console.log('🔌 API Gateway: http://localhost:3000');