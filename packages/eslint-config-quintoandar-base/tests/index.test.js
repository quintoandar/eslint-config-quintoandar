const config = require('../index');
const rules = require('../rules/index');

describe('Eslint shareable config (BASE)', () => {
  it('parser should have correct value', () => {
    expect(config.parser).toBe('babel-eslint');
  });

  it('parser should have correct value', () => {
    expect(config.extends).toEqual(['eslint:recommended', 'airbnb-base']);
  });

  it('env should have correct object value', () => {
    expect(config.env).toMatchObject({
      browser: true,
      node: true,
      jest: true,
      es6: true,
    });
  });

  it('parserOptions should have correct object value', () => {
    expect(config.parserOptions).toMatchObject({
      ecmaVersion: 6,
      sourceType: 'module',
    });
  });

  it('rules should have the correct value imported by rules', () => {
    expect(config.rules).toBe(rules);
  });
});
