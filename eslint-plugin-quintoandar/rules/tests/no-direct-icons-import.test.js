

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-direct-icons-import');
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
  Do not import Material-ui icons from lib root.
  Use directly import instead. Ex: import Icon from @material-ui/icons/Icon.
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-direct-icons-import', rule, {
  valid: [{
    code: "import App from '@material-ui/icons/App'"
  }],
  invalid: [{
    code: "import { App } from '@material-ui/icons'",
    errors,
  }]
});
