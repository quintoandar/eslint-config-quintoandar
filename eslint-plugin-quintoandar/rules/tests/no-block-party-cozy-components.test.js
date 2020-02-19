// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-block-party-cozy-components');
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
  Do not use block-party's cozy components.
  Use @quintoandar/cozy-core package instead (see: https://cozy.quintoandar.com.br/?path=/story/introduction-getting-started--page).
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-block-party-cozy-components', rule, {
  valid: [
    { code: "import ChipChoice from '@quintoandar/cozy-core/ChipChoice'" },
    { code: "import Select from '@quintoandar/cozy-core/Select'" },
  ],
  invalid: [
    { code: "import ChipChoice from 'block-party/components/cozy/ChipChoice'", errors },
    { code: "import Select from 'block-party/components/cozy/Select'", errors },
  ]
});
