const rules = require('./rules/index');

module.exports = {
  parser: 'babel-eslint',

  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],

  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },

  rules,
};
