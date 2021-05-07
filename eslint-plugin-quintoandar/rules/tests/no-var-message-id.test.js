// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-var-message-id');
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
  Do not use variables on message id.
  This prevent us from generating messages with static code analysis.

  See more: https://guidelines.quintoandar.com.br/#/pwa/internationalization
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-var-message-id', rule, {
  invalid: [
    { code: "export default defineMessages({ title: { id: `${test}`, defaultMessage: 'test invalid message' } })", errors }
  ],
  valid: [
    { code: "export default defineMessages({ title: { id: 'valid id', defaultMessage: 'test valid message' } })"},
    { code: "export default otherFunction({ title: { id: `${test}`, defaultMessage: 'test other function' } })"}
  ],
});
