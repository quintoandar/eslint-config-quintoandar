

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

const reportTextOutOfOrder = `
  The imports should follow the order:

  import ... from 'react';

  import ... from 'external-lib';

  import ... from '@quintoandar/';

  import ... from 'components/';
  import ... from 'containers/';
  import ... from 'helpers/';
  import ... from 'utils/';

  import ... from '../';
  import ... from './';
`;

const reportTextSortedAlphabetically = 'The imports should be sorted alphabetically';

/** Valid test with all possible imports */
const validCodeAllImports = `
  import React from 'react';

  import something from 'external-lib/something-a';
  import anotherThing from 'external-lib/something-b';

  import SomeBiomaComponent from '@quintoandar/bioma-component-a/SomeComponent';
  import AnotherBiomaComponent from '@quintoandar/bioma-component-b/AnotherComponent';
  import SomeCozyComponent from '@quintoandar/cozy-component-a/SomeComponent';
  import AnotherCozyComponent from '@quintoandar/cozy-component-b/AnotherComponent';

  import SomeInternalComponent from 'components/SomeComponent';
  import SomeInternalContainer from 'containers/SomeContainer';
  import someInternalHelper from 'helpers/someHelper';
  import someInternalUtil from 'utils/someUtil';

  import SomethingFromRelativePath from '../../Something';
  import AnotherThingFromRelativePath from '../AnotherThing';
  import AndOneMoreThingFromRelativePath from './AndOneMoreThing';
`;

/** Valid test with some of the possible imports */
const validCodeSomeImports = `
  import something from 'external-lib/something-a';
  import anotherThing from 'external-lib/something-b';

  import SomeInternalComponent from 'components/SomeComponent';
  import SomeInternalContainer from 'containers/SomeContainer';
  import someInternalHelper from 'helpers/someHelper';
  import someInternalUtil from 'utils/someUtil';

  import SomethingFromRelativePath from '../../Something';
  import AndOneMoreThingFromRelativePath from './AndOneMoreThing';
`;

/** Invalid test with unordered imports */
const invalidCodeUnorderedImports = `
  import React from 'react';

  import SomeInternalComponent from 'components/SomeComponent';

  import SomeBiomaComponent from '@quintoandar/bioma-component-a/SomeComponent';

  import something from 'external-lib/something-a';
`;

/** Invalid test with imports not sorted alphabetically */
const invalidCodeNotSortedAlphabetically = `
  import anotherThing from 'external-lib/something-b';
  import something from 'external-lib/something-a';

  import someInternalUtil from 'utils/someUtil';
  import SomeInternalComponent from 'components/SomeComponent';

  import AndOneMoreThingFromRelativePath from './AndOneMoreThing';
  import SomethingFromRelativePath from '../../Something';
`;

/** Invalid test with unordered abd not sorted alphabetically imports */
const invalidCodeUnorderedAndNotSorted = `
  import someInternalUtil from 'utils/someUtil';
  import SomeInternalComponent from 'components/SomeComponent';

  import anotherThing from 'external-lib/something-b';
  import something from 'external-lib/something-a';

  import AndOneMoreThingFromRelativePath from './AndOneMoreThing';
  import SomethingFromRelativePath from '../../Something';
`;

/** Invalid test with one unordered import (auto-fix test) */
const invalidCodeUnorderedImportsAutoFix = `
  import React from 'react';

  import something from 'external-lib/something-a';

  import SomeInternalComponent from 'components/SomeComponent';

  import SomeBiomaComponent from '@quintoandar/bioma-component-a/SomeComponent';
`;

/** Invalid test with one unordered import (auto-fix output) */
const invalidCodeUnorderedImportsAutoFixOutput = `
  import React from 'react';

  import something from 'external-lib/something-a';

  import SomeBiomaComponent from '@quintoandar/bioma-component-a/SomeComponent';

  import SomeInternalComponent from 'components/SomeComponent';
`;

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('custom-import-order', rule, {
  valid: [
    { code: validCodeAllImports },
    { code: validCodeSomeImports },
  ],
  invalid: [
    {
      code: invalidCodeUnorderedImports,
      errors: [{ reportTextOutOfOrder }, { reportTextOutOfOrder }],
    },
    {
      code: invalidCodeNotSortedAlphabetically,
      errors: [{ reportTextSortedAlphabetically }, { reportTextSortedAlphabetically }, { reportTextSortedAlphabetically }],
    },
    {
      code: invalidCodeUnorderedAndNotSorted,
      errors: [{ reportTextOutOfOrder }, { reportTextSortedAlphabetically }, { reportTextSortedAlphabetically }, { reportTextSortedAlphabetically }],
    },
    {
      code: invalidCodeUnorderedImportsAutoFix,
      errors: [{ reportTextOutOfOrder }],
      output: invalidCodeUnorderedImportsAutoFixOutput
    },
  ]
});
