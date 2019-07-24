const MuiPath = '@material-ui/core';

const reportText = `
  Do not import Material-ui directly.
  Use block-party imports instead.
`;

module.exports = function noMuiImport(context) {
  const checkString = (node, string) => node.indexOf(string) >= 0;
  return {
    ImportDeclaration(node) {
      if (checkString(node.source.value, MuiPath)) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
