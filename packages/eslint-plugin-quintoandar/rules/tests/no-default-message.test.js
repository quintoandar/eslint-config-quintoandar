// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-default-message');
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
  Do not access defaultMessage directly.
  We use react-intl for internationalization, so we MUST always use intl.formatMessage function
  instead of accessing the message directly from the object (.defaultMessage).

  See more: https://guidelines.quintoandar.com.br/#/pwa/internationalization
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-default-message', rule, {
  valid: [
    { code: "intl.formatMessage(messages.title)"}
  ],
  invalid: [
    { code: "messages.title.defaultMessage", errors }
  ]
});
