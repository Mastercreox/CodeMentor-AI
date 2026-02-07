// Simple test script to verify auth service functionality
const { AuthService } = require('./dist/services/AuthService');

async function testAuth() {
  console.log('Testing AuthService...');
  
  const authService = new AuthService();
  
  // Test registration
  const registrationData = {
    email: 'test@example.com',
    username: 'testuser',
    password: 'TestPassword123',
    initialLanguage: 'python'
  };
  
  try {
    console.log('Testing registration...');
    const result = await authService.register(registrationData);
    console.log('Registration result:', result.success ? 'SUCCESS' : 'FAILED');
    if (!result.success) {
      console.log('Error:', result.error);
    }
  } catch (error) {
    console.log('Registration error:', error.message);
  }
}

testAuth().catch(console.error);