const { OFF, WARN, ERROR } = require('./constants').CONFIG_RULES;

const rules = {
  'arrow-parens': [
    ERROR,
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
  'eol-last': [
    ERROR,
    'always',
  ],
  'no-trailing-spaces': ERROR,
  'no-alert': ERROR,
  'no-console': ERROR,
  'prefer-template': ERROR,
  'no-confusing-arrow': OFF,
  'newline-per-chained-call': OFF,
  'no-use-before-define': OFF,
  'class-methods-use-this': OFF,
  'require-yield': OFF,
};

const concatenatedRules = Object.assign({}, rules);

module.exports = concatenatedRules;
