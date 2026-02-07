module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    // Disable rules that might cause issues
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'warn'
  }
};
