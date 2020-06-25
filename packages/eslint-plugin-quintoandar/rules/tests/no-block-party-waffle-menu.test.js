

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../no-block-party-waffle-menu');
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
  Do not use Block-party WaffleMenu containers or components.
  Use Bioma waffle-menu package instead (see: https://github.com/quintoandar/bioma/tree/master/packages/waffle-menu).
`;

const errors = [{ reportText }];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-block-party-waffle-menu-import', rule, {
  valid: [
    { code: "import WaffleMenu from '@bioma/waffle-menu/containers/WaffleMenu'" },
    { code: "import WaffleMenu from '@bioma/waffle-menu/components/WaffleMenu'" },
    { code: "import MenuButton from '@bioma/waffle-menu/components/WaffleMenu/MenuButton'" },
    { code: "import OwnersWaffleMenu from '@bioma/waffle-menu/containers/OwnersWaffleMenu'" },
    { code: "import OwnersWaffleMenu from '@bioma/waffle-menu/components/OwnersWaffleMenu'" },
  ],
  invalid: [
    { code: "import WaffleMenu from 'block-party/containers/WaffleMenu'", errors },
    { code: "import WaffleMenu from 'block-party/components/WaffleMenu'", errors },
    { code: "import MenuButton from 'block-party/components/WaffleMenu/MenuButton'", errors },
    { code: "import OwnersWaffleMenu from 'block-party/containers/OwnersWaffleMenu'", errors },
    { code: "import OwnersWaffleMenu from 'block-party/components/OwnersWaffleMenu'", errors },
  ]
});
