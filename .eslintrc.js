module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    //代码风格
    'standard',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'operator-linebreak': ['error', 'before'],
    'object-curly-spacing': ['error', 'always'],
    'react/prop-types': [0],
    'require-jsdoc': [0],
    'linebreak-style': [0],
    indent: ['error', 2],
    'max-len': ['error', 999],
    'no-unused-vars': 'off',
    camelcase: 'off',
    'no-invalid-this': 0,
    'no-tabs': 'off',
    'react/display-name': 'off',
  },
};
