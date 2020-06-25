const DimensPath = 'assets/values/dimens';

const reportText = `
  Do not import Dimens.
  Use material-ui's Box component instead. (block-party/components/Box)
  https://material-ui.com/system/spacing/
`;

module.exports = function noDimensImport(context) {
  const checkString = (node, string) => node.indexOf(string) >= 0;
  return {
    ImportDeclaration(node) {
      if (checkString(node.source.value, DimensPath)) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
