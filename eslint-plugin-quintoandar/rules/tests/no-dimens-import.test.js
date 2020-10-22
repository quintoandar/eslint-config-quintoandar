

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
  Use cozy's Box component instead. (@quintoandar/cozy-core/Box)
  For more info, check:
  https://cozy.quintoandar.com.br/?path=/docs/components-box--base-example
  https://material-ui.com/system/spacing/
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-dimens-import', rule, {
  valid: [{
    code: "import Box from '@quintoandar/cozy-core/Box'"
  }],
  invalid: [{
    code: "import Dimens from 'block-party/assets/values/dimens'",
    errors,
  }, {
    code: "import Dimens from 'assets/values/dimens'",
    errors,
  }, {
    code: "import Dimens from 'deprecated/dimens'",
    errors,
  }]
});
