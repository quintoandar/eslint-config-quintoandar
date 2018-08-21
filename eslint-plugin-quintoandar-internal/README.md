<div align="center">
  <img width="450" height="76" vspace="" hspace="25" src="https://github.com/quintoandar/eslint-config-quintoandar/blob/master/eslint-config-quintoandar.png?raw=true">
  <h1>eslint-plugin-quintoandar-internal</h1>
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
"eslint-plugin-quintoandar-internal": "file:../eslint-plugin-quintoandar-internal"
```

#### Usage

```js
  "plugins": [
    "quintoandar-internal"
  ],
```

## Rules

### Go back needs a fallback

Do not allow the usage of the method `goBack` directly imported by the lib. Enforce always use a goBack with fallback.

#### How to use it

Just add the code below in your rules array:

```js
"quintoandar-internal/go-back-needs-fallback": 2,
```

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
"quintoandar-internal/no-typo-components": 2,
```

## Contributing

Please read [CONTRIBUTING.md](../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

Plus: Always to remember to update this readme when adding a new custom rule.