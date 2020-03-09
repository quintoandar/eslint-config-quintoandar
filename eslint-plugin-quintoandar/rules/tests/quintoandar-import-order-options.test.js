

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

const optionsWithoutOverride = [
  {
    projectAbsolutePaths: ['components/', 'containers/', 'experiments/'],
  },
];

const optionsWithOverride = [
  {
    override: true,
    projectAbsolutePaths: ['components/', 'containers/', 'experiments/'],
  },
];

const validCodeWithoutOverride = `
  import something from 'external-lib/something-a';
  import anotherThing from 'external-lib/something-b';

  import SomeInternalComponent from 'components/SomeComponent';
  import SomeInternalContainer from 'containers/SomeContainer';
  import SomeExperiment from 'experiments/someExperiment';
  import someInternalHelper from 'helpers/someHelper';
  import someInternalUtil from 'utils/someUtil';

  import SomethingFromRelativePath from '../../Something';
  import AndOneMoreThingFromRelativePath from './AndOneMoreThing';
`;

const invalidCodeWithoutOverride = `
  import SomeExperiment from 'experiments/someExperiment';
  import something from 'external-lib/something-a';

  import someInternalHelper from 'helpers/someHelper';
  import someInternalUtil from 'utils/someUtil';

  import SomethingFromRelativePath from '../../Something';
  import AndOneMoreThingFromRelativePath from './AndOneMoreThing';
`;

const validCodeWithOverride = `
  import something from 'external-lib/something-a';
  import anotherThing from 'external-lib/something-b';
  import someInternalHelper from 'helpers/someHelper';
  import someInternalUtil from 'utils/someUtil';

  import SomeInternalComponent from 'components/SomeComponent';
  import SomeInternalContainer from 'containers/SomeContainer';
  import SomeExperiment from 'experiments/someExperiment';

  import SomethingFromRelativePath from '../../Something';
  import AndOneMoreThingFromRelativePath from './AndOneMoreThing';
`;

const invalidCodeWithOverride = `
  import something from 'external-lib/something-a';
  import anotherThing from 'external-lib/something-b';

  import SomeExperiment from 'experiments/someExperiment';
  import someInternalHelper from 'helpers/someHelper';

  import SomethingFromRelativePath from '../../Something';
  import AndOneMoreThingFromRelativePath from './AndOneMoreThing';
`;

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('quintoandar-import-order', rule, {
  valid: [
    { code: validCodeWithoutOverride, options: optionsWithoutOverride },
    { code: validCodeWithOverride, options: optionsWithOverride },
  ],
  invalid: [
    {
      code: invalidCodeWithoutOverride,
      options: optionsWithoutOverride,
      errors: [{ reportTextOutOfOrder }],
    },
    {
      code: invalidCodeWithOverride,
      options: optionsWithOverride,
      errors: [{ reportTextOutOfOrder }],
    },
  ]
});
