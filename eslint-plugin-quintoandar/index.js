/* eslint-disable global-require */
module.exports = {
  processors: {
    '.json': require('./processors/json'),
  },
  rules: {
    'no-dynamic-import-index': require('./rules/no-dynamic-import-index'),
    'no-target-blank': require('./rules/no-target-blank'),
    'no-typo-components': require('./rules/no-typo-components'),
    'no-block-party-colors': require('./rules/no-block-party-colors'),
    'no-rgba-colors': require('./rules/no-rgba-colors'),
    'no-npm-registry': require('./rules/no-npm-registry'),
    'no-theme-import': require('./rules/no-theme-import'),
    'no-themeprovider-import': require('./rules/no-themeprovider-import'),
  },
  configs: {
    recommended: {
      rules: {
        'no-target-blank': 2,
        'no-typo-components': 2,
        'no-block-party-colors': 2,
        'no-rgba-colors': 2,
        'no-npm-registry': 2,
        'no-theme-import': 2,
        'no-themeprovider-import': 2,
      },
    },
  },
};
