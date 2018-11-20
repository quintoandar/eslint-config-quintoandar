const rules = require('./rules/index');

module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',

  plugins: [
    'jsx-a11y',
    'quintoandar'
  ],

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },

  rules,
};
