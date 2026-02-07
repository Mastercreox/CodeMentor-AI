#!/usr/bin/env node

/**
 * Status check script to verify project setup and readiness
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📊 CodeMentor AI Status Check\n');

// Check prerequisites
function checkPrerequisites() {
  console.log('🔍 Prerequisites:');
  
  const checks = [
    {
      name: 'Node.js',
      check: () => {
        const version = execSync('node --version', { encoding: 'utf8' }).trim();
        const major = parseInt(version.replace('v', '').split('.')[0]);
        return { status: major >= 18, version, required: '18+' };
      }
    },
    {
      name: 'npm',
      check: () => {
        const version = execSync('npm --version', { encoding: 'utf8' }).trim();
        const major = parseInt(version.split('.')[0]);
        return { status: major >= 9, version, required: '9+' };
      }
    },
    {
      name: 'MongoDB',
      check: () => {
        try {
          execSync('mongod --version', { stdio: 'ignore' });
          return { status: true, version: 'Installed', required: 'Any' };
        } catch {
          return { status: false, version: 'Not found', required: 'Any' };
        }
      }
    },
    {
      name: 'Redis',
      check: () => {
        try {
          execSync('redis-server --version', { stdio: 'ignore' });
          return { status: true, version: 'Installed', required: 'Any' };
        } catch {
          return { status: false, version: 'Not found', required: 'Any' };
        }
      }
    }
  ];

  checks.forEach(({ name, check }) => {
    try {
      const result = check();
      const icon = result.status ? '✅' : '❌';
      console.log(`  ${icon} ${name}: ${result.version} (Required: ${result.required})`);
    } catch (error) {
      console.log(`  ❌ ${name}: Not found`);
    }
  });
}

// Check project setup
function checkProjectSetup() {
  console.log('\n🏗️  Project Setup:');
  
  const checks = [
    {
      name: 'Dependencies installed',
      check: () => fs.existsSync('node_modules')
    },
    {
      name: 'Packages built',
      check: () => fs.existsSync('packages/shared/dist') && fs.existsSync('packages/types/dist')
    },
    {
      name: 'Environment files',
      check: () => {
        const services = ['auth-service', 'api-gateway', 'llm-service'];
        return services.every(service => 
          fs.existsSync(path.join('services', service, '.env'))
        );
      }
    }
  ];

  checks.forEach(({ name, check }) => {
    const status = check();
    const icon = status ? '✅' : '❌';
    console.log(`  ${icon} ${name}`);
  });
}

// Check configuration
function checkConfiguration() {
  console.log('\n⚙️  Configuration:');
  
  const authEnvPath = path.join('services', 'auth-service', '.env');
  const llmEnvPath = path.join('services', 'llm-service', '.env');
  
  const checks = [
    {
      name: 'JWT Secret configured',
      check: () => {
        if (!fs.existsSync(authEnvPath)) return false;
        const content = fs.readFileSync(authEnvPath, 'utf8');
        return !content.includes('your-super-secret-jwt-key-here');
      }
    },
    {
      name: 'OpenAI API Key configured',
      check: () => {
        if (!fs.existsSync(llmEnvPath)) return false;
        const content = fs.readFileSync(llmEnvPath, 'utf8');
        return !content.includes('your-openai-api-key-here');
      }
    }
  ];

  checks.forEach(({ name, check }) => {
    const status = check();
    const icon = status ? '✅' : '⚠️ ';
    console.log(`  ${icon} ${name}`);
  });
}

// Main status check
function main() {
  try {
    checkPrerequisites();
    checkProjectSetup();
    checkConfiguration();
    
    console.log('\n📋 Next Steps:');
    console.log('1. If any prerequisites are missing, see GETTING_STARTED.md');
    console.log('2. If project setup is incomplete, run: npm run setup');
    console.log('3. Configure OpenAI API key in services/llm-service/.env');
    console.log('4. Start the application: npm run dev');
    console.log('5. Check service health: npm run health');
    
  } catch (error) {
    console.error('❌ Status check failed:', error.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };