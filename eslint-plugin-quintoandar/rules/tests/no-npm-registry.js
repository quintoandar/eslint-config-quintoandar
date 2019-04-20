// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require("../no-npm-registry");
const json = require("../../processors/json");
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

// RuleTester doesn't allow preprocessors
const preprocessor = (tests) => {
  for (let type of Object.keys(tests)) {
    tests[type] = tests[type].map((item) => {
      item.code = json.preprocess(item.code, item.filename)[0];
      return item;
    });
  }
  return tests;
};

const ruleTester = new RuleTester();
ruleTester.run("no-npm-registry", rule, preprocessor({
  valid: [
    {
      code: '{ "resolved": "https://nexus.quintoandar.com.br/repository/npm/@babel/core/-/core-7.3.3.tgz" }',
      filename: 'package-lock.json',
    },
    {
      code: '{}',
      filename: 'anything',
    },
  ],
  invalid: [
    {
      code: '{ "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.0.0-beta.40.tgz" }',
      filename: 'package-lock.json',
      errors: [{
        reportText: 'Unexpected resolved domain at: https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.0.0-beta.40.tgz\nThis project must use Nexus as registry. More info at https://quin.to/eslint-rule-no-npm-registry',
      }],
    },
  ],
}));
