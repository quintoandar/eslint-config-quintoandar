const importRules = require('./import');
const reactRules = require('./react');
const jsxRules = require('./jsx');
const { OFF, WARN, ERROR } = require('./constants').CONFIG_RULES;

const rules = {
  'arrow-parens': [
    'error',
    'always'
  ],
  'arrow-body-style': [
    ERROR,
    'as-needed'
  ],
  'comma-dangle': [
    ERROR,
    'always-multiline'
  ],
  indent: [
    ERROR,
    ERROR,
    {
      SwitchCase: WARN,
    }
  ],
  'max-len': [
    ERROR,
    120,
    ERROR,
    {
      ignoreUrls: true
    }
  ],
  'newline-per-chained-call': OFF,
  'no-confusing-arrow': OFF,
  'no-console': ERROR,
  'no-alert': ERROR,
  'no-use-before-define': OFF,
  'prefer-template': ERROR,
  'class-methods-use-this': OFF,
  'require-yield': OFF,
};

const concatenatedRules = Object.assign({}, rules, importRules, reactRules, jsxRules);

module.exports = concatenatedRules;
