#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting CodeMentor AI Production Services...\n');

const services = [
  { name: 'LLM Service', port: 3007, path: 'services/llm-service' },
  { name: 'Code Explainer', port: 3004, path: 'services/code-explainer-service' },
  { name: 'Error Analyzer', port: 3005, path: 'services/error-analyzer-service' },
  { name: 'API Gateway', port: 3000, path: 'services/api-gateway' },
];

const processes = [];

// Start each service
services.forEach(service => {
  console.log(`Starting ${service.name} on port ${service.port}...`);
  
  const proc = spawn('npm', ['start'], {
    cwd: path.join(__dirname, service.path),
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      PORT: service.port.toString()
    }
  });

  proc.on('error', (error) => {
    console.error(`❌ Error starting ${service.name}:`, error);
  });

  proc.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ ${service.name} exited with code ${code}`);
    }
  });

  processes.push(proc);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down services...');
  processes.forEach(proc => proc.kill('SIGTERM'));
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down services...');
  processes.forEach(proc => proc.kill('SIGTERM'));
  process.exit(0);
});

console.log('\n✅ All services started successfully!');
console.log('📊 Health check: http://localhost:3000/health\n');
