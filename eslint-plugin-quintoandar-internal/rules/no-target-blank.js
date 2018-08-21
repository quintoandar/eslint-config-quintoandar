function isExpressionBlank(value) {
  return value.type === 'JSXExpressionContainer' &&
    typeof value.expression.value === 'string' &&
    value.expression.value.toLowerCase() === '_blank';
}

function isLiteralBlank(value) {
  return value.type === 'Literal' &&
    value.value.toLowerCase() === '_blank';
}

function isTargetBlank(attr) {
  return attr.name.name === 'target' &&
    (isLiteralBlank(attr.value) || isExpressionBlank(attr.value));
}

function hasExternalLink(element) {
  return element.attributes.some((attr) => attr.name &&
      (attr.name.name === 'href' || attr.name.name === 'to'));
}

function hasSecureRel(element) {
  return element.attributes.find((attr) => {
    if (attr.type === 'JSXAttribute' && attr.name.name === 'rel') {
      const tags = attr.value && attr.value.type === 'Literal' && attr.value.value.toLowerCase().split(' ');
      return tags && (tags.indexOf('noopener') >= 0 && tags.indexOf('noreferrer') >= 0);
    }
    return false;
  });
}

module.exports = function noTargetBlank(context) {
  return {
    JSXAttribute(node) {
      if (
        isTargetBlank(node) &&
        hasExternalLink(node.parent) &&
        !hasSecureRel(node.parent)
      ) {
        context.report({
          node,
          message: 'Using target="_blank" without rel="noopener noreferrer" ' +
          'is a security risk: see https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/',
          fix: (fixer) => fixer.insertTextAfter(node, ' rel="noopener noreferrer"'),
        });
      }
    },
  };
};
