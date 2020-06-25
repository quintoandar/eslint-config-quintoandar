const path = require('path');

const npmRegistryPattern = /registry\.npmjs\.org\//g;
const nexusURL = 'nexus.quintoandar.com.br/repository/npm/';
const reportText = `Unexpected resolved domain at: {{ package }}
  This project must use Nexus as registry. More info at https://quin.to/eslint-rule-no-npm-registry`;

const create = (context) => {
  let filename = context.getFilename();
  if (path.basename(filename) !== 'package-lock.json') {
    return {};
  }
  return {
    Property(node) {
      if (node.key.value === 'resolved' && node.value.value.match(npmRegistryPattern)) {
        context.report({
          node,
          message: reportText,
          data: {
            package: node.value.value
          },
          fix(fixer) {
            /** 
             * https://quintoandar.atlassian.net/browse/FOX-931
             * WIP: Processor not applying this fix!
             */
            const newUrl = node.value.value.replace(npmRegistryPattern, nexusURL);
            return fixer.replaceText(node.value, newUrl);
          }
        });
      }
    }
  };
};

module.exports = {
  create,
  meta: {
    type: 'problem',
    docs: {
      description: 'Does not allow package-lock.json resolved URLs to be npm\'s registry.',
      category: 'Infrastructure',
      recommended: true
    },
    fixable: 'code'
  },
};
