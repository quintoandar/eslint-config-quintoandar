const firstPath = 'assets/themes/';
const secondPath = 'assets/values/theme';

const reportText = `
  Do not import theme directly.
  Use withTheme instead (see: https://material-ui.com/css-in-js/api/#withtheme-component-component)
`;

module.exports = function noThemeImport(context) {
  const checkString = (node, string) => node.indexOf(string) >= 0;
  return {
    ImportDeclaration(node) {
      if (checkString(node.source.value, firstPath) || checkString(node.source.value, secondPath)) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
