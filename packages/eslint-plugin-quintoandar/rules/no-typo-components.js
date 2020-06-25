const notAllowedTypoPath = 'assets/typo';

const reportText = `
  Do not use any of Block-party Typo components.
  Use material-ui Typography (see: https://material-ui.com/api/typography/#typography)
  or Block-party Typography component (see: https://goo.gl/QP49NH) instead.
  Make sure to follow the guidelines to fix it (see: https://goo.gl/VwV911).
`;

module.exports = function noTypoComponents(context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value.indexOf(notAllowedTypoPath) >= 0) {
        context.report({
          node,
          message: reportText,
        });
      }
    },
  };
};
