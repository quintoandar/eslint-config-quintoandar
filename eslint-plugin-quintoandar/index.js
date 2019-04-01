/* eslint-disable global-require */
module.exports = {
  rules: {
    'no-dynamic-import-index': require('./rules/no-dynamic-import-index'),
    'no-target-blank': require('./rules/no-target-blank'),
    'no-typo-components': require('./rules/no-typo-components'),
    'no-block-party-colors': require('./rules/no-block-party-colors'),
  },
  configs: {
    recommended: {
      rules: {
        'no-target-blank': 2,
        'no-typo-components': 2,
        'no-block-party-colors': 2,
      },
    },
  },
};
