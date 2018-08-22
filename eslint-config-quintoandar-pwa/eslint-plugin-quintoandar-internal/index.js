/* eslint-disable global-require */
module.exports = {
  rules: {
    'no-target-blank': require('./rules/no-target-blank'),
    'go-back-needs-fallback': require('./rules/go-back-needs-fallback'),
    'no-typo-components': require('./rules/no-typo-components'),
  },
  configs: {
    recommended: {
      rules: {
        'go-back-needs-fallback': 2,
        'no-target-blank': 2,
        'no-typo-components': 2,
      },
    },
  },
};
