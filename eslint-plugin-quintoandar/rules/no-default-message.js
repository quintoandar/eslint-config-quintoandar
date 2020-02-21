const notAllowedProperty = 'defaultMessage';

const reportText = `
  Do not access defaultMessage directly.
  We use react-intl for internationalization, so we MUST always use intl.formatMessage function
  instead of accessing the message directly from the object (.defaultMessage).

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
