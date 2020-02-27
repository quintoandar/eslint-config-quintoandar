

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../custom-import-order');
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

const cozyPath = /^@quintoandar\/cozy/;
const biomaPath = /^@quintoandar\/bioma/;

const importOrder = [
  biomaPath,
  cozyPath,
];

const reportText = `
  The imports should follow the order:
  ${importOrder}
`;

console.log(reportText);

const errors = [{ reportText }];

const validCode = `
  import SomeUnrelatedComponent from '@quintoandar/bioma-unrelated/SomeUnrelatedComponent';

  import SomeComponent from '@quintoandar/cozy-core/SomeComponent';

  import Something from 'block-party/Something';
`;

const invalidCode = `
  import SomeComponent from '@quintoandar/cozy-core/SomeComponent';

  import Something from 'block-party/Something';

  import SomeUnrelatedComponent from '@quintoandar/bioma-unrelated/SomeUnrelatedComponent';
`;

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('custom-import-order', rule, {
  valid: [
    { code: validCode },
  ],
  invalid: [{
    code: invalidCode,
    errors,
  }]
});
