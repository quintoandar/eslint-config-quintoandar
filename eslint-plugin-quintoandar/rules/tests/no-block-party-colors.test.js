

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-block-party-colors');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true,
  },
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const reportText = `
  Do not use any of Block-party colors.
  Use withTheme instead (see: https://material-ui.com/css-in-js/api/#withtheme-component-component)
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-hardcoded-colors', rule, {
  valid: [
    { code: "import withTheme from '@material-ui/core/styles/withTheme'" },
  ],
  invalid: [{
    code: "import { white } from 'assets/values/colors'",
    errors,
  }, {
    code: "import { white } from 'block-party/assets/values/colors'",
    errors,
  }]
});
