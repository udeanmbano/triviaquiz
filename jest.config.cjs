// jest.config.js or jest.config.cjs
module.exports = {
  transform: {
    '^.+\\.vue$': 'vue-jest', // Ensure correct usage
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
