const message = `Do not dynamically import "index" files, give them a more unique name instead.
Duplicated import() strings across a project may cause problems with react-loadable requesting more chunks than necessary.`;

// Match strings ending in '/index' with optional extension
const indexFileRegex = /.*\/index(\..*)?$/;

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow dynamically importing "index" files',
      category: 'Best Practices',
    },
  },
  create: function noDynamicImportIndex(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === 'Import' && node.arguments.some((arg) => indexFileRegex.test(arg.value))) {
          context.report({ node, message });
        }
      },
    };
  },
};
