

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

const validCode = `
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

const invalidCode = `
  import SomeComponent from 'some-component';

  import React from 'react';
`;

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('custom-import-order', rule, {
  valid: [
    { code: validCode },
  ],
  invalid: [{
    code: invalidCode,
    errors: [{ reportTextOutOfOrder }],
  }]
});
