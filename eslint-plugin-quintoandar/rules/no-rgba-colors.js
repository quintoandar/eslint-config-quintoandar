const reportText = `
  Do not use hardcoded rgba colors.
  Use colorToRgbString instead with color and opacity. Like:
  Path: import { colorToRgbString } from 'block-party/util/colorToRgb';
  colorToRgbString(themeColor, 0.5)
`;

module.exports = function noHardcodedRgbaColors(context) {
  return {
      "Identifier": function(node) {
        if (node.name.indexOf('rgb') >= 0 || node.name.indexOf('rgba') >= 0) {
          context.report({
            node,
            message: reportText,
          });
        }
      }
  };
};
