const reportText = `
  Do not use hardcoded rgba colors.
  Use colorToRgbString instead with color and opacity. Like:
  colorToRgbString(themeColor, 0.5)
`;

module.exports = function noHardcodedRgbaColors(context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value.indexOf('rgba') >= 0) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
