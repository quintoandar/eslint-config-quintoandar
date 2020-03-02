const reactPath = /^react$/;

const externalLibsPaths = /^(?!(.\/|..\/|@quintoandar\/|components\/|containers\/|helpers\/|utils\/))/;

const companyPaths = /^@quintoandar\//;

const projectAbsolutePaths = /^(components\/|containers\/|helpers\/|utils\/)/;

const relativePaths = /^(.\/|..\/)/;

const importOrder = [
  reactPath,
  externalLibsPaths,
  companyPaths,
  projectAbsolutePaths,
  relativePaths,
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

module.exports = function customImportOrder(context) {
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
};
