/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    // 'jest/globals': true // Remove this line for Vitest
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    // Add other recommended configurations as needed
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'vue',
    // Remove 'jest' plugin since you're using Vitest
    // 'jest'
  ],
  rules: {
    // Your custom rules
  }
}
