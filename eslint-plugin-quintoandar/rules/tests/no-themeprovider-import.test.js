

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-themeprovider-import');
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
  Do not use ThemeProvider in components.
  Use withTheme instead (see: https://material-ui.com/css-in-js/api/#withtheme-component-component)
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-themeprovider-import', rule, {
  valid: [
    { code: "import withTheme from '@material-ui/core/styles/withTheme'" },
  ],
  invalid: [{
    code: "import ThemeProvider from 'assets/themeprovider'",
    errors,
  }, {
    code: "import ThemeProvider from 'block-party/assets/themeprovider'",
    errors,
  }, {
    code: "import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'",
    errors,
  }]
});
