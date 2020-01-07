

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-block-party-login');
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
  Do not use Block-party Login container.
  Use Bioma Auth package instead (see: https://github.com/quintoandar/bioma/tree/master/packages/auth).
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-block-party-login-import', rule, {
  valid: [
    { code: "import Login from '@bioma/auth/containers/Login'" },
  ],
  invalid: [{
    code: "import Login from 'containers/Login'",
    errors,
  }, {
    code: "import Login from 'block-party/containers/Login'",
    errors,
  }]
});
