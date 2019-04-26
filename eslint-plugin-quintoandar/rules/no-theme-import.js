const notAllowedPath = 'assets/themes/';

const reportText = `
  Do not import theme directly.
  Use withTheme instead (see: https://material-ui.com/css-in-js/api/#withtheme-component-component)
`;

module.exports = function noThemeImport(context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value.indexOf(notAllowedPath) >= 0) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
