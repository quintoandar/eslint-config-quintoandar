const rules = require('./rules/index');

module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',

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
};
