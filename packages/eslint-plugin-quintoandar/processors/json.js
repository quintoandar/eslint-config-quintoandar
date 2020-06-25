const jsonProcessor = require('eslint-plugin-json').processors['.json'];

const whitelistJsonRules = ['quintoandar/no-npm-registry'];

const convertToModuleExports = (text) => `module.exports = ${text}`;

const filterDefaultESLintRules = ({ ruleId }) => whitelistJsonRules.indexOf(ruleId) !== -1;

const reducerErrorMessages = (total, next) => total.concat(next.filter(filterDefaultESLintRules));

const preprocess = (text, fileName) => jsonProcessor.preprocess(text, fileName).map(convertToModuleExports);

const postprocess = (messages, fileName) => jsonProcessor.postprocess(messages, fileName)
  .concat(messages.reduce(reducerErrorMessages, []));

module.exports = {
  whitelistJsonRules,
  filterDefaultESLintRules,
  preprocess,
  postprocess,
  supportsAutofix: true
};
