const config = require('../index');
const rules = require('../rules/index');

describe('Eslint shareable config', () => {
  it('parser should have correct value', () => {
    expect(config.parser).toBe('babel-eslint');
  });

  it('parser should have correct value', () => {
    expect(config.extends).toBe('airbnb');
  });

  it('env should have correct object value', () => {
    expect(config.env).toMatchObject({
      browser: true,
      node: true,
      jest: true,
      es6: true,
    });
  });

  it('plugins should have correct array value', () => {
    expect(config.plugins).toEqual(['react', 'jsx-a11y', 'quintoandar']);
  });

  it('parserOptions should have correct object value', () => {
    expect(config.parserOptions).toMatchObject({
      ecmaVersion: 6,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    });
  });

  it('rules should have the correct value imported by rules', () => {
    expect(config.rules).toBe(rules);
  });
});
