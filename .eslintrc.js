module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'import', 'jest', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    browser: false,
    jest: true,
  },
  overrides: [
    {
      files: ['src/**/*.ts'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
    project: 'tsconfig.tests.json',
  },
  rules: {
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'import/no-extraneous-dependencies': 'off',

    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/require-await': 'warn',
  },
};
