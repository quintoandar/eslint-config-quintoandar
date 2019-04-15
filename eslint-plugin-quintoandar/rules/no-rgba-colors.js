const reportText = `
  Do not use hardcoded rgba colors.
  Use colorToRgbString instead with color and opacity. Like:
  colorToRgbString(themeColor, 0.5)
`;

module.exports = function noHardcodedRgbaColors(context) {
  const sourceCode = context.getSourceCode();
  const source = sourceCode.getText();
  return {
      "Identifier": function(node) {
        if (source.indexOf('rgb(') >= 0 || source.indexOf('rgba(') >= 0) {
          context.report({
            node,
            message: reportText,
          });
        }
      }
  };
};
