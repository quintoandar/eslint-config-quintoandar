const { CLIEngine } = require('eslint');

describe('load config in eslint to validate all rule syntax is correct', () => {
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: '.eslintrc'
  });

  const validate = (codeText) => cli.executeOnText(codeText);

  it('should not have any errors', () => {
    const code = "const foo = () => 'bar';\nfoo();\n";
    expect(validate(code).errorCount).toBe(0);
  });

  it('should not match specific lint errors', () => {
    const code = "const foo = 'bar';";
    const errorResults = validate(code).results[0];
    expect(errorResults.messages).toEqual(expect.arrayContaining([
      expect.objectContaining({
        ruleId: 'no-unused-vars',
      })
    ]));

    expect(errorResults.messages).toEqual(expect.arrayContaining([
      expect.objectContaining({
        ruleId: 'eol-last',
      })
    ]));
  });

  it('should have errors greater than 0', () => {
    const code = 'var foo = 1\nvar bar = function () {}\nbar(foo)\n';
    expect(validate(code).errorCount).toBeGreaterThan(0);
  });
});
