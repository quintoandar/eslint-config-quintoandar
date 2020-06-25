

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-theme-import');
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
  Do not import theme directly.
  Use withTheme instead (see: https://material-ui.com/css-in-js/api/#withtheme-component-component)
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-theme-import', rule, {
  valid: [{
    code: "import withTheme from '@material-ui/core/styles/withTheme'"
  }],
  invalid: [{
    code: "import theme from 'assets/themes/blue'",
    errors,
  }, {
    code: "import theme from 'block-party/assets/themes/blue'",
    errors,
  }, {
    code: "import theme from 'block-party/assets/themes/green'",
    errors,
  }, {
    code: "import theme from 'block-party/assets/values/theme'",
    errors,
  }, {
    code: "import theme from 'assets/values/theme'",
    errors,
  }]
});
