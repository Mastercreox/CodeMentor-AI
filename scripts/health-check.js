#!/usr/bin/env node

/**
 * Health check script to verify all services are running
 */

const http = require('http');

const services = [
  { name: 'API Gateway', port: 3000, path: '/health' },
  { name: 'Web Client', port: 8080, path: '/' },
  { name: 'Auth Service', port: 3002, path: '/health' },
  { name: 'User Profile Service', port: 3003, path: '/health' },
  { name: 'Code Explainer Service', port: 3004, path: '/health' },
  { name: 'Error Analyzer Service', port: 3005, path: '/health' },
  { name: 'Language Tutor Service', port: 3006, path: '/health' },
  { name: 'LLM Service', port: 3007, path: '/health' }
];

async function checkService(service) {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: service.port,
      path: service.path,
      method: 'GET',
      timeout: 5000
    }, (res) => {
      resolve({
        name: service.name,
        status: res.statusCode === 200 ? '✅ Healthy' : `⚠️  Status ${res.statusCode}`,
        port: service.port
      });
    });

    req.on('error', () => {
      resolve({
        name: service.name,
        status: '❌ Not responding',
        port: service.port
      });
    });

    req.on('timeout', () => {
      resolve({
        name: service.name,
        status: '⏱️  Timeout',
        port: service.port
      });
    });

    req.end();
  });
}

async function checkAllServices() {
  console.log('🔍 Checking CodeMentor AI Services Health...\n');
  
  const results = await Promise.all(services.map(checkService));
  
  results.forEach(result => {
    console.log(`${result.status.padEnd(20)} ${result.name} (Port ${result.port})`);
  });

  const healthyCount = results.filter(r => r.status.includes('✅')).length;
  console.log(`\n📊 ${healthyCount}/${results.length} services healthy`);
}

checkAllServices().catch(console.error);