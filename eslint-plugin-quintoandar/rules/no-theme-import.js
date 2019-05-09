const notAllowedPaths = [
  'assets/themes/blue',
  'block-party/assets/themes/blue',
  'assets/themes/green',
  'block-party/assets/themes/green',
  'assets/themes/light-v1',
  'block-party/assets/themes/light-v1',
  'assets/themes/dark-v1',
  'block-party/assets/themes/dark-v1',
  'assets/themes/purple',
  'block-party/assets/themes/purple',
  'assets/themes/orange',
  'block-party/assets/themes/orange',
  'assets/themes/grey',
  'block-party/assets/themes/grey',
  'assets/themes/yellow',
  'block-party/assets/themes/yellow',
  'assets/themes/transparent-v1',
  'block-party/assets/themes/transparent-v1',
  'assets/themes/transparent',
  'block-party/assets/themes/transparent',
  'assets/values/theme',
  'block-party/assets/values/theme',
];

const reportText = `
  Do not import theme directly.
  Use withTheme instead (see: https://material-ui.com/css-in-js/api/#withtheme-component-component)
`;

module.exports = function noThemeImport(context) {
  return {
    ImportDeclaration(node) {
      if (notAllowedPaths.includes(node.source.value)) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
