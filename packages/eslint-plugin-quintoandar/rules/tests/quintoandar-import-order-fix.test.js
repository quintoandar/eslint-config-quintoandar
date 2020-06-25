

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../quintoandar-import-order');
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

const reportTextOutOfOrder = `
  The imports should follow the order:
  import ... from 'react';
  import ... from 'external-lib';
  import ... from '@quintoandar/';
  import ... from 'project-absolute-paths/';
  import ... from '../';
  import ... from './';
`;

const reportTextSortedAlphabetically = 'The imports should be sorted alphabetically';

/** Invalid test with one unordered import (auto-fix test) */
const invalidCodeUnorderedImports = `
  import React from 'react';

  import something from 'external-lib/something-a';

  import SomeInternalComponent from 'components/SomeComponent';

  import SomeBiomaComponent from '@quintoandar/bioma-component-a/SomeComponent';
`;

/** Invalid test with one unordered import (auto-fix test) */
const invalidCodeUnorderedImportsAutoFixOutput = `
  import React from 'react';

  import something from 'external-lib/something-a';

  import SomeBiomaComponent from '@quintoandar/bioma-component-a/SomeComponent';

  import SomeInternalComponent from 'components/SomeComponent';
`;

/** Invalid test with one unsorted import (auto-fix test) */
const invalidCodeUnsortedImports = `
  import React from 'react';

  import anotherSomething from 'external-lib/something-b';
  import something from 'external-lib/something-a';

  import SomeBiomaComponent from '@quintoandar/bioma-component-a/SomeComponent';

  import SomeInternalComponent from 'components/SomeComponent';
`;

/** Invalid test with one unsorted import (auto-fix output) */
const invalidCodeUnsortedImportsAutoFixOutput = `
  import React from 'react';

  import something from 'external-lib/something-a';
  import anotherSomething from 'external-lib/something-b';

  import SomeBiomaComponent from '@quintoandar/bioma-component-a/SomeComponent';

  import SomeInternalComponent from 'components/SomeComponent';
`;

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('quintoandar-import-order', rule, {
  valid: [],
  invalid: [
    {
      code: invalidCodeUnorderedImports,
      errors: [{ reportTextOutOfOrder }],
      output: invalidCodeUnorderedImportsAutoFixOutput
    },
    {
      code: invalidCodeUnsortedImports,
      errors: [{ reportTextSortedAlphabetically }],
      output: invalidCodeUnsortedImportsAutoFixOutput
    },
  ]
});
