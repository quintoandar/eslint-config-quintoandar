const cozyPath = /^@quintoandar\/cozy/;
const biomaPath = /^@quintoandar\/bioma/;

const importOrder = [
  biomaPath,
  cozyPath,
];

const reportText = `
  The imports should follow the order:
  ${biomaPath}
`;

module.exports = function noHardcodedColors(context) {
  let pastImportPosition = 0;
  return {
    ImportDeclaration(node) {
      const newImportPosition = importOrder.findIndex((importPath) => importPath.test(node.source.value))
      if (newImportPosition >= 0 && pastImportPosition > newImportPosition) {
        context.report({
          node,
          message: reportText,
        });
      } else if (newImportPosition >= 0) {
        pastImportPosition = newImportPosition;
      }
    }
  };
};
