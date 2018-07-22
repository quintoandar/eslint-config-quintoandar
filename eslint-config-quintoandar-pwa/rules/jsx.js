const { OFF, ERROR } = require('./constants').CONFIG_RULES;

module.exports = {
  'jsx-a11y/aria-props': ERROR,
  'jsx-a11y/heading-has-content': OFF,
  'jsx-a11y/href-no-hash': ERROR,
  'jsx-a11y/label-has-for': ERROR,
  'jsx-a11y/mouse-events-have-key-events': ERROR,
  'jsx-a11y/role-has-required-aria-props': ERROR,
  'jsx-a11y/role-supports-aria-props': ERROR,
};
