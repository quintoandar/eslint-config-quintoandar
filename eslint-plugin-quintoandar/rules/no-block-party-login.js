const notAllowedLoginPathRegex = /^(block-party\/)?(containers\/Login)/;

const reportText = `
  Do not use Block-party Login container.
  Use Bioma Auth package instead (see: https://github.com/quintoandar/bioma/tree/master/packages/auth).
`;

module.exports = function noBlockPartyLoginImport(context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value.match(notAllowedLoginPathRegex)) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
