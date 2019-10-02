

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-dimens-import');
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
  Do not import Dimens.
  Use material-ui's Box component instead. (block-party/components/Box)
  https://material-ui.com/system/spacing/
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-dimens-import', rule, {
  valid: [{
    code: "import Box from 'block-party/components/Box'"
  }],
  invalid: [{
    code: "import Dimens from 'block-party/assets/values/dimens'",
    errors,
  }, {
    code: "import Dimens from 'assets/values/dimens'",
    errors,
  }]
});
