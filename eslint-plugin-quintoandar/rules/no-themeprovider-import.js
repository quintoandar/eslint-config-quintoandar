const notAllowedPaths = [
  '@material-ui/core/styles/MuiThemeProvider',
  'assets/themeprovider',
  'block-party/assets/themeprovider',
];

const reportText = `
  Do not use ThemeProvider in components.
  Use withTheme instead (see: https://material-ui.com/css-in-js/api/#withtheme-component-component)
`;

module.exports = function noThemeProviderImport(context) {
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
