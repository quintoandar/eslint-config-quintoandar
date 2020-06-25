const notAllowedColorsPath = 'assets/values/colors';

const reportText = `
  Do not use any of Block-party colors.
  Use withTheme instead (see: https://material-ui.com/css-in-js/api/#withtheme-component-component)
  Make sure to follow the guidelines to fix it (see: https://github.com/quintoandar/guidelines/blob/master/pwa/styling.md#theme).
`;

module.exports = function noHardcodedColors(context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value.indexOf(notAllowedColorsPath) >= 0) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
