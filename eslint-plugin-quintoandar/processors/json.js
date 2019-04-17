const jsonProcessor = require('eslint-plugin-json').processors['.json'];

module.exports = {
	preprocess(text, fileName) {
		return jsonProcessor.preprocess(text, fileName)
			.map((text) => `module.exports = ${text}`);
	},
	postprocess(messages, fileName) {
		return jsonProcessor.postprocess(messages, fileName).concat(
			messages.reduce((total, next) => {
				// Disables ESLint rules except for the one filtered
				return total.concat(next.filter(error => {
					return error.ruleId === 'quintoandar/no-npm-registry';
				}));
			}, [])
		);
	},
	supportsAutofix: true
};