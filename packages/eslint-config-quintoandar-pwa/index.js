const rules = require('./rules/index');

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'quintoandar-base'
  ],

  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },

  plugins: [
    'react',
    'jsx-a11y',
    'quintoandar'
  ],

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  rules,
  overrides: [
    {
      files: ['*-test.js', 'app.js', 'app/*/*.js'],
      rules: {
        'quintoandar/no-theme-import': 'off',
        'quintoandar/no-themeprovider-import': 'off'
      }
    }
  ],
};
