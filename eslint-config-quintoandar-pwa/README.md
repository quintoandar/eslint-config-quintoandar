# eslint-config-quintoandar-pwa

[![npm](https://img.shields.io/npm/v/eslint-config-quintoandar-pwa.svg)](https://www.npmjs.com/package/eslint-config-quintoandar-pwa) 
[![npm](https://img.shields.io/npm/dw/eslint-config-quintoandar-pwa.svg)](https://www.npmjs.com/package/eslint-config-quintoandar-pwa)
![eslint-config-quintoandar-pwa-badge]

## Table of Contents

* [Getting start](#getting-start)
    * [Install](#install)
      * [Install peer dependencies](#install-peer-dependencies)
    * [Usage](#usage)
* [What configs and rules ?](#what-configs-and-rules-)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [Roadmap](#roadmap)
* [Badges](#badges)

This package provides QuintoAndar's .eslintrc for PWA as an extensible shared config.

## Getting start

### Install

```shell
npm install --save-dev eslint-config-quintoandar-pwa
```

#### Install peer dependencies

Install the correct versions of each package required, which are listed by the command:

```shell
npm info "eslint-config-quintoandar-pwa@latest" peerDependencies
```

You can use this shortcut in NPM+5 to install all peer deps:

```shell
npx install-peerdeps --dev eslint-config-quintoandar-pwa
```

### Usage

In your project, create a file `.eslintrc.json` and extends this project:

```es6
{
  "extends": "eslint-config-quintoandar-pwa"
}
```

## What configs and rules ?

We extends Airbnb's configs and add new rules specific to QuintoAndar's PWA projects.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [CHANGELOG.md](CHANGELOG.md)

## Contributing

Please read [CONTRIBUTING.md](../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Roadmap

- [ ] Check to verify that everytime we have `async` method there is an `await` invocation
- [ ] Lint rule to prevent using " !important " on css rules
- [ ] Enforce to do not use dispatch inside components folder or inside react component in containers folder (#newRule)
- [ ] Quantity of lines + Line lenght
- [ ] Create lint rule to force a comment justifying Lint suppressions (#newRule)
- [ ] Lint rule to deprecate function binding in favor of Class properties with arrow functions
- [ ] Object destructing limit
- [ ] Libraries imports ordering
- [ ] Put custom of goBack (react-router)

## Badges

![eslint-config-quintoandar-pwa-badge]

[eslint-config-quintoandar-pwa-badge]: https://img.shields.io/badge/code%20style-eslint--config--quintoandar--pwa-5063f0.svg

Add the following line in your markdown readme:

```md
![eslint-config-quintoandar-pwa-badge](https://img.shields.io/badge/code%20style-eslint--config--quintoandar--pwa-5063f0.svg)
```
