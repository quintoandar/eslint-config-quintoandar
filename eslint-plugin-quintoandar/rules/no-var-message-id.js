const defineMessagesFunctionName = 'defineMessages';
const objectExpressionType = 'ObjectExpression';
const propertyType = 'Property';
const literalType = 'Literal';

const reportText = `
  Do not use variables on message id.
  This prevent us from generating messages with static code analysis.

  See more: https://guidelines.quintoandar.com.br/#/pwa/internationalization
`;

const isDefineMessages = (node) => node.callee.name === defineMessagesFunctionName;
const hasArguments = (node) => node.arguments && node.arguments.length;
const hasProperties = (node) =>  node.arguments[0].type === objectExpressionType && node.arguments[0].properties;
const isProperty = (property) => property.type === propertyType;
const hasMessageProps = (property) => property.value.type === objectExpressionType && property.value.properties;
const isValueLiteral = (property) => property.value.type === literalType;

module.exports = function noVarMessageId(context) {
  return {
    CallExpression(node) {
      if (!isDefineMessages(node) || !hasArguments(node) || !hasProperties(node)) {
        return;
      }

      const jsonObject = node.arguments[0].properties;

      jsonObject.forEach((jsonNode) => {
        if (!isProperty(jsonNode) || !hasMessageProps(jsonNode)) {
          return;
        }

        const message = jsonNode.value.properties;
        const idField = message.find(x => x.key.name === 'id');

        if (!isValueLiteral(idField)) {
          context.report({
            node,
            message: reportText,
          });
        }
      });
    }
  };
};
