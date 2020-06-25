const { OFF, ERROR } = require('./constants').CONFIG_RULES;

module.exports = {
  'react/forbid-prop-types': OFF,
  'react/jsx-first-prop-new-line': [
    ERROR,
    'multiline',
  ],
  'react/jsx-filename-extension': OFF,
  'react/jsx-no-target-blank': OFF,
  'react/require-extension': OFF,
  'react/self-closing-comp': OFF,
  'react/jsx-no-bind': [
    ERROR,
    {
      allowArrowFunctions: false,
      allowBind: false
    }
  ],
};
