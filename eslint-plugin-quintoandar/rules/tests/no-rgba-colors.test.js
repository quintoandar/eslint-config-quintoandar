

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-rgba-colors');
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
  Do not use hardcoded rgb or rgba colors.
  Use colorToRgbString instead with color and opacity. Like:
  colorToRgbString(themeColor, 0.5)
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-hardcoded-colors', rule, {
  valid: [
    { code: "colorToRgbString(themeColor, 0.5)" },
  ],
  invalid: [{
    code: "rgba()",
    errors,
  }, {
    code: "rgba(0,0,0, 0.5)",
    errors,
  }, {
    code: "rgb(0,0,0)",
    errors,
  }]
});
