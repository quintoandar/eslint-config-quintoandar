const rules = require('./rules/index');

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },

  rules,
};
