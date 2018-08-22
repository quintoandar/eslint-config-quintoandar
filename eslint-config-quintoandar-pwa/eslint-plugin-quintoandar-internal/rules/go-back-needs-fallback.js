module.exports = function goBackNeedsFallback(context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value.indexOf('react-router-redux') >= 0
        && node.specifiers.some((s) => s.imported.name === 'goBack')) {
        context.report(node, 'Do not use goBack without fallback. Use routes/common/goBack');
      }
    },
  };
};
