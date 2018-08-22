<div align="center">
  <img width="450" height="76" vspace="" hspace="25" src="https://github.com/quintoandar/eslint-config-quintoandar/blob/master/eslint-config-quintoandar.png?raw=true">
  <h1>eslint-plugin-quintoandar</h1>
</div>

## Table of Contents

* [Getting start](#getting-start)
* [Rules](#rules)
* [Contributing](#contributing)

## Getting start

This package provides QuintoAndar's custom eslint rules, that are created by our engineer's demand.
All these rules are accessible in the eslint config that is plugged in. For example, the package `eslint-config-quintoandar-pwa` uses it as a plugin.

These custom rules can be used in two ways:

- use directly, applying to everybody
- use new custom rule progressive


### How to add in a project as an eslint plugin

#### Install

```js
npm install --save-dev eslint-plugin-quintoandar
```

#### Usage

```js
  "plugins": [
    "quintoandar"
  ],
```

or

```js
  "plugins": [
    "eslint-plugin-quintoandar"
  ],
```

## Rules

### No target blank

Do not allow the usage of `target="_blank"` without `rel="noopener noreferrer` because of a security problem.

#### How to use it

Just add the code below in your rules array:

```js
"internal/no-target-blank": 2,
```

### No typo components

Create a new custom rule is also a way to move from the deprecated approach to new one. This rule does exactly this, enforce to do not use any component from the file called `Typo`.

#### How to use it

Just add the code below in your rules array

```js
"quintoandar/no-typo-components": 2,
```

## Contributing

Please read [CONTRIBUTING.md](../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### How to write a new custom rule

Just go to `/rules` folder, create a new file and export as default one function receiving `context` and write the condition.

```js
module.exports = function(context) {
  return {
    ....
    context.report({ /*... somethong */ })
  }
}
```

In order to make it easy, there're two interesting tools:

- [Eslint rules generator](https://github.com/eslint/generator-eslint)
- [AST explorer](https://astexplorer.net/) to help verify how to get what you need;

**Plus**: Always to remember to update this readme and create unit tests when adding a new custom rule.

Reference: https://medium.com/@btegelund/creating-an-eslint-plugin-87f1cb42767f
