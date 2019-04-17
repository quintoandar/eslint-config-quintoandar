/**
 * This processor is based upon:
 * - https://github.com/azeemba/eslint-plugin-json
 * - https://github.com/kellyselden/eslint-plugin-json-files
 * 
 * ESLint does not natively supports process files other then JS.
 * This processor adds capabilities to process JSON files using
 * vscode's json processor: vscode-json-languageservice.
 * 
 * It does not work exactly as a ordinary ESLint processor because JSON
 * is a different language than JS.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const jsonService = require("vscode-json-languageservice");

const jsonServiceHandle = jsonService.getLanguageService({});
jsonServiceHandle.configure({
	"validate": true,
	"allowComments": true // setting doesn't seem to matter
});

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const ErrorCode = {
	Undefined: 0,
	EnumValueMismatch: 1,
	UnexpectedEndOfComment: 0x101,
	UnexpectedEndOfString: 0x102,
	UnexpectedEndOfNumber: 0x103,
	InvalidUnicode: 0x104,
	InvalidEscapeCharacter: 0x105,
	InvalidCharacter: 0x106,
	PropertyExpected: 0x201,
	CommaExpected: 0x202,
	ColonExpected: 0x203,
	ValueExpected: 0x204,
	CommaOrCloseBacketExpected: 0x205,
	CommaOrCloseBraceExpected: 0x206,
	TrailingComma: 0x207,
	DuplicateKey: 0x208,
	CommentNotPermitted: 0x209,
	SchemaResolveError: 0x300
};

function getCodeRuleName(code) {
	for (let codeName in ErrorCode) {
		if (ErrorCode.hasOwnProperty(codeName)) {
			if (ErrorCode[codeName] === code) {
				return 'json/' + codeName.toLowerCase();
			}
		}
	}

	return 'json/unknown';
}

const fileContents = {};
const fileDocuments = {};

function toDiagnosticSeverity(severityLevel) {
	switch (severityLevel) {
	case "error": return 1;
	case "warning": return 2;
	case "ignore": return 0;
	}
	return 0;
}

function makeDiagnostic(c, message, severity, errorCode) {
	return {
		range: c,
		message: message,
		severity: severity,
		code: errorCode
	};
}

const getDiagnostics = function(textDocument, jsonDocument) {
	const diagnostics = [];
	const added  = {};
	const addProblem = function(problem) {
		// remove duplicated messages
		const signature = problem.range.start.line + " " + problem.range.start.character + " " + problem.message;
		if (!added[signature]) {
			added[signature] = true;
			diagnostics.push(problem);
		}
	};
	const trailingCommaSeverity = 1; // ERROR
	const commentSeverity = 1; // ERROR

	jsonDocument.syntaxErrors.forEach(function(p) {
		if (p.code === ErrorCode.TrailingComma) {
			if (typeof commentSeverity !== "number") {
				return;
			}
			p.severity = trailingCommaSeverity;
		}
		addProblem(p);
	});

	if (typeof commentSeverity === "number") {
	    const message = "InvalidCommentToken: Comments are not permitted in JSON.";
	    jsonDocument.comments.forEach(function(c) {
	        addProblem(makeDiagnostic(c, message, commentSeverity, ErrorCode.CommentNotPermitted));
	    });
	}
	return diagnostics;
};

module.exports = {
	preprocess(text, fileName) {
		const textDocument = jsonService.TextDocument.create(fileName, "json", 1, text);
		const parsed = jsonServiceHandle.parseJSONDocument(textDocument);
		fileContents[fileName] = getDiagnostics(textDocument, parsed);
		fileDocuments[fileName] = textDocument;
		return [`module.exports = ${text}`];
	},
	postprocess(messages, fileName) {
		const errors = fileContents[fileName] || [];
		const textDocument = fileDocuments[fileName];
		delete fileContents[fileName];
		delete fileDocuments[fileName];
		const formattedErrors = errors.map((error) => {
			return {
				ruleId: getCodeRuleName(error.code),
				severity: (error.severity == 1) ? 2 : 1,
				message: error.message,
				line: error.range.start.line + 1,
				column: error.range.start.character + 1,
				endLine: error.range.end.line + 1,
				endColumn: error.range.end.character + 1,
				source: textDocument.getText(error.range)
			};
		});
		return formattedErrors.concat(
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