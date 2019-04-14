const path = require('path');

const npmRegistryPattern = /registry\.npmjs\.org\//g;
const nexusURL = 'nexus.quintoandar.com.br/repository/npm/';

module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Does not allow package-lock.json resolved URLs changes to npm\'s registry.',
			category: 'Infrastructure',
			recommended: true
		},
		fixable: 'code',
	},

	create: function(context) {
		let filename = context.getFilename();
    if (path.basename(filename) !== 'package-lock.json') {
      return {};
		}
		return {
			Property(node) {
				if (node.key.value === 'resolved'
					&& node.value.value.match(npmRegistryPattern)) {
						context.report({
							node,
							message: 'Unexpected resolved domain at: {{ package }}',
							data: {
								package: node.value.value
							},
              fix: function(fixer) {
                const newUrl = node.value.value.replace(npmRegistryPattern, nexusURL);
                return fixer.replaceText(node.value, newUrl);
              }
						});
					}
			}
		};
	}
};
