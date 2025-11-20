module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module'
  },
  env: {
    node: true,
    jest: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
      js: 'never'
    }],
    'no-new': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
};
