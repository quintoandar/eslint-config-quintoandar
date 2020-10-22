const notAllowedDimensPath = /^.*(assets\/values|deprecated)\/(dimens)/;

const reportText = `
  Do not import Dimens.
  Use cozy's Box component instead. (@quintoandar/cozy-core/Box)
  For more info, check:
  https://cozy.quintoandar.com.br/?path=/docs/components-box--base-example
  https://material-ui.com/system/spacing/
`;

module.exports = function noDimensImport(context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value.match(notAllowedDimensPath)) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
