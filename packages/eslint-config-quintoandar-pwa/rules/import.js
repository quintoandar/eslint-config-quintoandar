const { OFF, ERROR } = require('./constants').CONFIG_RULES;

module.exports = {
  'import/imports-first': OFF,
  'import/newline-after-import': OFF,
  'import/no-dynamic-require': OFF,
  'import/no-extraneous-dependencies': OFF,
  'import/no-named-as-default': OFF,
  'import/no-unresolved': ERROR,
  'import/prefer-default-export': OFF,
  'import/no-webpack-loader-syntax': OFF,
};
