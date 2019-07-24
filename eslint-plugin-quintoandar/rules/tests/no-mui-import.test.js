

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-mui-import');
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
  Do not import Material-ui directly.
  Use block-party imports instead.
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-mui-import', rule, {
  valid: [{
    code: "import Button from 'block-party/components/Button'"
  }],
  invalid: [{
    code: "import theme from '@material-ui/core'",
    errors,
  }, {
    code: "import theme from '@material-ui/core/'",
    errors,
  }]
});
