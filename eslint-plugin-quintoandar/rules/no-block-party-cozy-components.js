const notAllowedCozyComponentsPathRegex = /^(block-party\/(components)\/(cozy))/;

const reportText = `
  Do not use block-party's cozy components.
  Use @quintoandar/cozy-core package instead (see: https://cozy.quintoandar.com.br/?path=/story/introduction-getting-started--page).
`;

module.exports = function noBlockPartyLoginImport(context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value.match(notAllowedCozyComponentsPathRegex)) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
