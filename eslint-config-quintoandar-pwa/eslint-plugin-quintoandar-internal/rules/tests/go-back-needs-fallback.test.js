

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../go-back-needs-fallback');
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

const message = 'Do not use goBack without fallback. Use routes/common/goBack';

const errors = [{ message }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('go-back-needs-fallback', rule, {
  valid: [
    { code: "import { push } from 'react-router-redux';" },
    { code: "import { goBack } from 'routes/common/goBack';" },
  ],
  invalid: [{
    code: "import { goBack } from 'react-router-redux';",
    errors,
  }],
});
