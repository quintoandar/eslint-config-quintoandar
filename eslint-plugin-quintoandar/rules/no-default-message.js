const notAllowedProperty = 'defaultMessage';

const reportText = `
Do not access defaultMessage directly.
We use react Intl for internationalization, so we MUST always use of intl.formatMessage 
instead of accessing directly the message of the object (.defaultMessage).

See more: https://guidelines.quintoandar.com.br/#/pwa/internationalization
`;

module.exports = function noDefaultMessage(context) {
  return {
    MemberExpression(node) {
      if (node.property.name === notAllowedProperty) {
        context.report({
          node,
          message: reportText,
        });
      }
    }
  };
};
