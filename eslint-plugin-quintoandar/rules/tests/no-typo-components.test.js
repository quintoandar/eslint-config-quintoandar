

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-typo-components');
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

const message = `
  Do not use any of Block-party Typo components.
  Use material-ui Typography (see: https://material-ui.com/api/typography/#typography)
  or Block-party Typography component (see: https://goo.gl/QP49NH) instead.
  Make sure to follow the guidelines to fix it (see: https://goo.gl/VwV911).
`;

const errors = [{ message }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-typo-components', rule, {
  valid: [
    { code: "import Typography from '@materia-ui/core/Typography';" },
    { code: "import { WidthPropType } from 'block-party/prop-types/Material';" },
  ],
  invalid: [{
    code: "import { StyledFormattedMessage } from 'assets/typo';",
    errors,
  }, {
    code: "import Typo, { StyledText } from 'assets/typo';",
    errors,
  }, {
    code: "import Typo, { StyledText } from 'block-party/assets/typo';",
    errors,
  }, {
    code: "import Typo from 'block-party/assets/typo';",
    errors,
  }],
});
