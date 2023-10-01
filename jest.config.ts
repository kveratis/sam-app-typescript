import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: ['**/*.test.ts'],
  testTimeout: 100000,
  clearMocks: true,
  collectCoverage: true,
  reporters: [['github-actions', { silent: false }], 'summary'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['**/*.ts', '!**/node_modules/**', '!**/*.config.ts'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
};

export default config;
