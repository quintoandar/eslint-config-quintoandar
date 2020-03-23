<div align="center">
  <img width="450" height="76" vspace="" hspace="25" src="https://github.com/quintoandar/eslint-config-quintoandar/blob/master/eslint-config-quintoandar.png?raw=true">
  <h1>eslint-plugin-quintoandar</h1>
</div>

## Table of Contents

* [Getting started](#getting-started)
* [Rules](#rules)
* [Versioning](#versioning)
* [Contributing](#contributing)

## Getting started

This package provides QuintoAndar's custom eslint rules, that are created by our engineers' demand.
All these rules are accessible in the eslint config that is plugged in. For example, the package `eslint-config-quintoandar-pwa` uses it as a plugin.

These custom rules can be used in two ways:

- use directly, applying to everybody
- use new custom rule progressively

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

### No dynamic import index

Do not allow dynamically importing `index` files i.e. `import('./index')`, `import('../index')`. This rule was created because if multiple [react-loadable](https://github.com/jamiebuilds/react-loadable) components used the same path in the `import()` call, it would cause problems during chunk resolution and a page would load more JS chunks than necessary. Since most of the problems arose with multiple files named 'index', this rules suggests to rename them with a more specific name.

#### How to use it

Just add the code below in your rules array:

```js
"quintoandar/no-dynamic-import-index": 2,
```

### No target blank

Do not allow the usage of `target="_blank"` without `rel="noopener noreferrer` because of a security problem.

#### How to use it

Just add the code below in your rules array:

```js
"quintoandar/no-target-blank": 2,
```

### No typo components

Create a new custom rule is also a way to move from the deprecated approach to new one. This rule does exactly this, enforce to do not use any component from the file called `Typo`.

#### How to use it

Just add the code below in your rules array:

```js
"quintoandar/no-typo-components": 2,
```

### No Block-Party colors

Don't allow usage of Block-party colors.\
Use withTheme instead (see: https://material-ui.com/css-in-js/api/#withtheme-component-component)\
Make sure to follow the guidelines to fix it (see: https://github.com/quintoandar/guidelines/blob/master/pwa/styling.md#theme).

#### How to use it

Just add the code below in your rules array:

```js
"quintoandar/no-block-party-colors": 2,
```

### No rgba colors

Don't allow usage of hardcoded rgba colors.\
Use colorToRgbString instead with color and opacity. Like:
`colorToRgbString(themeColor, 0.5)`

#### How to use it

Just add the code below in your rules array:

```js
"quintoandar/no-rgba-colors": 2,
```

### No theme import

Do not import theme directly. (except for test files).\
Use withTheme instead (see: https://material-ui.com/css-in-js/api/#withtheme-component-component)

#### How to use it

Just add the code below in your rules array:

```js
"quintoandar/no-theme-import": 2,
```

### No ThemeProvider import

Do not use ThemeProvider in components. (except for app.js)\
Use withTheme instead (see: https://material-ui.com/css-in-js/api/#withtheme-component-component)

#### How to use it

Just add the code below in your rules array:

```js
"quintoandar/no-themeprovider-import": 2,
```

### No npm registry

Do not allow `package-lock.json` to contain `resolved` references pointed out to `registry.npmjs.org`.

#### Why

`.npmrc` file in node or pwa projects points to resolve references from `nexus` registry.

Whenever using npm-cli outside our network or Nexus could not provide packages, `package-lock.json` may change his `resolved`s keys to point directly to npm's registry.

As described in [documentation](https://docs.npmjs.com/files/package-locks.html), npm-cli tries to fetch from `resolved` first:

```
The presence of a package lock changes the installation behavior such that:

The module tree described by the package lock is reproduced. This means reproducing the structure described in the file, using the specific files referenced in “resolved” if available, falling back to normal package resolution using “version” if one isn’t.

The tree is walked and any missing dependencies are installed in the usual fashion.
```

#### Workarounds

In order to fix "automatically" `package-lock.json`, we usually try some of this steps:

1. Revert `package-lock.json` changes and run `npm intall` again
2. Remove `node_modules` folder and repeat step 1
3. As a last resort (not recommended), manually replace urls

#### How to use it

Just add the code below in your rules array (preferable to a progressive-lint config):

```js
"quintoandar/no-npm-registry": 2,
```

### No Block-Party Login import

Don't allow usage of Block-party Login container.
Use Biomas's Auth package instead (see: see: https://github.com/quintoandar/bioma/tree/master/packages/auth).

#### How to use it

Just add the code below in your rules array:

```js
"quintoandar/no-block-party-login-import": 2,
```

### No Block-Party WaffleMenu import

Don't allow usage of Block-party WaffleMenu containers and components.
Use Biomas's waffle-menu package instead (see: see: https://github.com/quintoandar/bioma/tree/master/packages/waffle-menu).

#### How to use it

Just add the code below in your rules array:

```js
"quintoandar/no-block-party-waffle-menu-import": 2,
```

### QuintoAndar custom import order

Enforces the following custom import order:

1 - `react` import;

2 - external libs imports;

3 - `@quintoandar` imports;

4 - projects absolute imports;

5 - projects relative imports;

#### Why

This rule aims in the direction of standardizing our code style. Beyond that it makes easier to find the imports.

#### How to use it

Just add the code below in your rules array:

```js
"quintoandar/quintoandar-import-order": 2,
```

#### Options

##### projectAbsolutePaths

With the `projectAbsolutePaths` option you can pass extra paths to be evaluated as absolute paths from the project. You can use it adding the following to your rules array:

```js
'quintoandar/quintoandar-import-order': [
  2,
  {
    projectAbsolutePaths: ['experiments/'],
  },
],
```

With the above configuration, all imports from `experiments` will be considered internal imports from the project:

```js
  // Start with external libs
  import something from 'external-lib/something-a';
  import anotherThing from 'external-lib/something-b';

  // Then projects absolute imports
  import SomeInternalComponent from 'components/SomeComponent';
  import SomeInternalContainer from 'containers/SomeContainer';
  import SomeExperiment from 'experiments/someExperiment';
  import someInternalHelper from 'helpers/someHelper';
  import someInternalUtil from 'utils/someUtil';
```

You can pass the `override` option too:

```js
'quintoandar/quintoandar-import-order': [
  2,
  {
    override: true,
    projectAbsolutePaths: ['components', 'containers', 'experiments/'],
  },
],
```

This way the default absolute paths (`components/`, `containers/`, `helpers/` or `utils/`) are overwritten. So the code above would not valid anymore, but the following would be:

```js
  // Start with external libs
  import something from 'external-lib/something-a';
  import anotherThing from 'external-lib/something-b';
  import someInternalHelper from 'helpers/someHelper';
  import someInternalUtil from 'utils/someUtil';

  // Then projects absolute imports
  import SomeInternalComponent from 'components/SomeComponent';
  import SomeInternalContainer from 'containers/SomeContainer';
  import SomeExperiment from 'experiments/someExperiment';
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [CHANGELOG.md](https://github.com/quintoandar/eslint-config-quintoandar/blob/master/eslint-plugin-quintoandar/CHANGELOG.md)


## Contributing

Please read [CONTRIBUTING.md](https://github.com/quintoandar/eslint-config-quintoandar/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### How to write a new custom rule

Just go to `/rules` folder, create a new file and export as default one function receiving `context` and write the condition.

```js
module.exports = function(context) {
  return {
    ....
    context.report({ /*... something */ })
  }
}
```

In order to make it easy, there're two interesting tools:

- [Eslint rules generator](https://github.com/eslint/generator-eslint)
- [AST explorer](https://astexplorer.net/) to help verify how to get what you need;

**Plus**: Always to remember to update this readme and create unit tests when adding a new custom rule.

Reference: https://medium.com/@btegelund/creating-an-eslint-plugin-87f1cb42767f
