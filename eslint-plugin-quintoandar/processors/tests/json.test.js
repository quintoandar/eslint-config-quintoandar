const plugin = require("../json.js");
const assert = require("chai").assert;

describe("plugin", function() {
  describe("structure", function() {
    it("should contain preprocess property", function() {
      assert.property(plugin, "preprocess", ".json.preprocess is not defined");
    });

    it("should contain postprocess property", function() {
      assert.property(
        plugin,
        "postprocess",
        ".json.postprocess is not defined"
      );
    });
  });

  describe("filterDefaultESLintRules", function() {
    describe('when ruleId is undefined', () => {
      it('should return false', () => {
        assert.isFalse(plugin.filterDefaultESLintRules({}));
      });
    });

    describe('when ruleId is empty', () => {
      it('should return false', () => {
        assert.isFalse(plugin.filterDefaultESLintRules({ ruleId: '' }));
      });
    });
    
    describe('when ruleId is "quintoandar/no-npm-registry"', () => {
      it('should return true', () => {
        assert.isTrue(plugin.filterDefaultESLintRules({
          ruleId: plugin.whitelistJsonRules[0],
        }));
      });
    });
  });

  describe("preprocess", function() {
    const preprocess = plugin.preprocess;
    it("should return the same text", function() {
      const fileName = "reallyLongFileName";
      const text = "long long text";

      const newText = preprocess(text, fileName);
      assert.isArray(newText, "preprocess should return array");
      assert.strictEqual(newText[0], `module.exports = ${text}`);
    });
  });
  
  describe("postprocess", function() {
    const preprocess = plugin.preprocess;
    const postprocess = plugin.postprocess;
    const singleQuotes = {
      fileName: "singleQuotes.json",
      text: "{'x': 0}"
    };
    const trailingCommas = {
      fileName: "trailing.json",
      text: '{ "x": 0, }'
    };
    const multipleErrors = {
      fileName: "multipleErrors.json",
      text: "{ x: 200, 'what': 0 }"
    };
    const trailingText = {
      fileName: "trailingtext.json",
      text: '{ "my_string": "hello world" }' + " \n" + "bad_text"
    };

    const good = {
      fileName: "good.json",
      text: JSON.stringify({ a: [1, 2, 3], b: "cat", c: { x: 1 } })
    };
    preprocess(singleQuotes.text, singleQuotes.fileName);
    preprocess(trailingCommas.text, trailingCommas.fileName);
    preprocess(multipleErrors.text, multipleErrors.fileName);
    preprocess(trailingText.text, trailingText.fileName);
    preprocess(good.text, good.fileName);

    it("should return an error for the single quotes", function() {
      const errors = postprocess([], singleQuotes.fileName);
      assert.isArray(errors, "should return an array");
      assert.lengthOf(errors, 1, "should return one error");

      const error = errors[0];
      assert.strictEqual(
        error.ruleId,
        "json/undefined",
        "should have a string ID"
      );
      assert.strictEqual(error.severity, 2, "should have a numeric severity");
      assert.strictEqual(
        error.message,
        "Property keys must be doublequoted",
        "should have a message"
      );
      assert.strictEqual(error.line, 1, "should point to first line");
      assert.strictEqual(error.column, 2, "should point to second character");
    });

    it("should return an error for trailing commas", function() {
      const errors = postprocess([], trailingCommas.fileName);
      assert.isArray(errors, "should return an array");
      assert.lengthOf(errors, 1, "should return one error");

      const error = errors[0];
      assert.strictEqual(
        error.ruleId,
        "json/trailingcomma",
        "should have a string ID"
      );
      assert.strictEqual(error.line, 1, "should point to the first line");
      assert.strictEqual(error.column, 9, "should point to the 9th character");
    });

    it("should report unrecoverable syntax error", function() {
      const errors = postprocess([], trailingText.fileName);
      assert.isArray(errors, "should return an array");
      assert.lengthOf(errors, 1, "should return one error");
      assert.isString(errors[0].message, "should have a valid message");

      // we don't validate the line/column numbers since they don't actually
      // mean anything for this error. JSHint just bails on the file.
    });

    it("should return multiple errors for multiple errors", function() {
      const errors = postprocess([], multipleErrors.fileName);
      assert.isArray(errors, "should return an array");
      assert.lengthOf(errors, 2, "should return one error");
    });

    it("should return no errors for good json", function() {
      const errors = postprocess([], good.fileName);
      assert.isArray(errors, "should return an array");
      assert.lengthOf(errors, 0, "good json shouldnt have any errors");
    });
  });
});
