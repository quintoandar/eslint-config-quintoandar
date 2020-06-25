const MuiPath = '@material-ui/icons';

const reportText = `
  Do not import Material-ui icons from lib root.
  Use directly import instead. Ex: import Icon from @material-ui/icons/Icon.
`;

module.exports = function noDirectIconsImport(context) {
  const checkString = (node, string) => node === string;

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
