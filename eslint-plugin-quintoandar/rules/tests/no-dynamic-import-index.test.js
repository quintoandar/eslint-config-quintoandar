// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-dynamic-import-index');
const RuleTester = require('eslint').RuleTester;

const parser = 'babel-eslint'; // import() is an experimental syntax
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

const message = `Do not dynamically import "index" files, give them a more unique name instead.
Duplicated import() strings across a project may cause problems with react-loadable requesting more chunks than necessary.`;

const errors = [{ message }];

const ruleTester = new RuleTester({ parser, parserOptions });
ruleTester.run('no-dynamic-import-index', rule, {
  valid: [
    { code: "import('./MyComponent')" },
    { code: "import('MyModule/index/MyComponent')" },
    { code: "() => import(/* webpackChunkName: \"searchListMode\" */ './SearchList')" },
  ],
  invalid: [
    { code: "import('./index')", errors },
    { code: "import('./index.js')", errors },
    { code: "import('./index.jsx')", errors },
    { code: "import('./index.ts')", errors },
    { code: "import('../index')", errors },
    { code: "import('../../../index')", errors },
    { code: "import('MyModule/MyComponent/index')", errors },
    { code: "() => import(/* webpackChunkName: \"NextStepsDialog\" */'./index')", errors },
  ],
});
