const notAllowedWaffleMenuPathRegex = /^(block-party\/(containers|components)\/(WaffleMenu|OwnersWaffleMenu))/;

const reportText = `
  Do not use Block-party WaffleMenu containers or components.
  Use Bioma waffle-menu package instead (see: https://github.com/quintoandar/bioma/tree/master/packages/waffle-menu).
`;

module.exports = function noBlockPartyWaffleMenuImport(context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value.match(notAllowedWaffleMenuPathRegex)) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
