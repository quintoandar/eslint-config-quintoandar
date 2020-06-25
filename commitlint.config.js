const COMMIT_AVAILABLE_TYPES = [
  'fix',
  'feat',
  'chore',
];

module.exports = {
  extends: [
    '@commitlint/config-conventional',
  ],
  rules: {
    'type-enum': [2, 'always', COMMIT_AVAILABLE_TYPES],
    'header-max-length': [0, 'always', 100],
  },
};
