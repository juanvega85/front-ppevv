module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:vitest-globals/recommended',
    'plugin:storybook/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    'import',
    '@typescript-eslint',
    'no-only-tests'
  ],
  rules: {
    'no-console': 'error',
    'no-only-tests/no-only-tests': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'prefer-destructuring': [ 'warn', { 'object': true }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    'vitest-globals/env': true
  },
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    '.next',
    'coverage',
    'dist',
    '.turbo',
    '**/*.config.ts',
  ],
}
