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

const reportTextOutOfOrder = `
  The imports should follow the order:
  import ... from 'react';
  import ... from 'external-lib';
  import ... from '@quintoandar/';
  import ... from 'project-absolute-paths/';
  import ... from '../';
  import ... from './';
`;

const reportTextSortedAlphabetically = 'The imports should be sorted alphabetically';

const getImportOrder = (context) => {
  const defaultImportOrder = [
    reactPathPattern,
    externalLibsPathsPattern,
    companyPathsPattern,
    projectAbsolutePathsPattern,
    relativePathsPattern,
  ];

  const EXTERNAL_LIBS_PATHS_INDEX = 1;
  const PROJECT_ABSOLUTE_PATHS_INDEX = 3;

  context.options.forEach((option) => {
    if (option !== null && typeof(option) === 'object' && !Array.isArray(option)) {
      if (option.projectAbsolutePaths && Array.isArray(option.projectAbsolutePaths)) {
        let newPathsUnion;
        let newProjectAbsolutePaths;
        if (Boolean(option.override)) {
          newPathsUnion = [companyPaths]
            .concat(relativePaths)
            .concat(option.projectAbsolutePaths);
          newProjectAbsolutePaths = option.projectAbsolutePaths;
        } else {
          const additionalProjectAbsolutePaths = option.projectAbsolutePaths.filter((path) => !projectAbsolutePaths.includes(path));
          newPathsUnion = pathsUnion.concat(additionalProjectAbsolutePaths);
          newProjectAbsolutePaths = projectAbsolutePaths.concat(additionalProjectAbsolutePaths);
        }

        const newExternalLibsPathsPattern = new RegExp(`^(?!(${newPathsUnion.join('|')}))`);
        const newProjectAbsolutePathsPattern = new RegExp(`^(${newProjectAbsolutePaths.join('|')})`);

        defaultImportOrder[EXTERNAL_LIBS_PATHS_INDEX] = newExternalLibsPathsPattern;
        defaultImportOrder[PROJECT_ABSOLUTE_PATHS_INDEX] = newProjectAbsolutePathsPattern;
      }
    }
  });

  return defaultImportOrder;
}

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

    const importOrder = getImportOrder(context);

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
