const companyPaths = '@quintoandar/';

const projectAbsolutePaths = ['components/', 'containers/', 'helpers/', 'utils/'];

const relativePaths = ['./', '../'];

const pathsUnion = [companyPaths]
  .concat(relativePaths)
  .concat(projectAbsolutePaths);

const reactPathPattern = /^react$/;
const externalLibsPathsPattern = new RegExp(`^(?!(${pathsUnion.join('|')}))`);
const companyPathsPattern = new RegExp(`^${companyPaths}`);
const projectAbsolutePathsPattern = new RegExp(`^(${projectAbsolutePaths.join('|')})`);
const relativePathsPattern = new RegExp(`^(${relativePaths.join('|')})`);

const importOrder = [
  reactPathPattern,
  externalLibsPathsPattern,
  companyPathsPattern,
  projectAbsolutePathsPattern,
  relativePathsPattern,
];

const reportTextOutOfOrder = `
  The imports should follow the order:
  import ... from 'react';
  import ... from 'external-lib';
  import ... from '@quintoandar/';
  import ... from 'components/';
  import ... from 'containers/';
  import ... from 'helpers/';
  import ... from 'utils/';
  import ... from '../';
  import ... from './';
`;

const reportTextSortedAlphabetically = 'The imports should be sorted alphabetically';

module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Quintoandar custom import order',
      category: 'Stylistic Issues',
    },
    fixable: 'code',
  },
  create: function customImportOrder(context) {
    let pastImportPosition = -1;
    let lastImportValue = '';

    return {
      ImportDeclaration(node) {
        const currentImportValue = node.source.value;
        const newImportPosition = importOrder.findIndex((importPath) => importPath.test(currentImportValue));
        if (newImportPosition >= 0 && pastImportPosition > newImportPosition) {
          context.report({
            node,
            message: reportTextOutOfOrder,
            fix: function(fixer) {
              const sourceCode = context.getSourceCode();
              const previousNode = sourceCode.getNodeByRangeIndex(sourceCode.getTokenBefore(node).range[0]);
              
              const previousNodeText = sourceCode.getText(previousNode);
              const currentNodeText = sourceCode.getText(node);

              return [fixer.replaceText(previousNode, currentNodeText), fixer.replaceText(node, previousNodeText)];
            }
          });
        } else if (newImportPosition === pastImportPosition && lastImportValue > currentImportValue) {
          context.report({
            node,
            message: reportTextSortedAlphabetically,
          });
        } else if (newImportPosition >= 0) {
          pastImportPosition = newImportPosition;
          lastImportValue = currentImportValue;
        }
      }
    };
  },
};
