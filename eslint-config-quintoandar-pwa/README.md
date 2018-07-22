# eslint-config-quintoandar-pwa


[![npm](https://img.shields.io/npm/v/eslint-config-quintoandar-pwa.svg)](https://www.npmjs.com/package/eslint-config-quintoandar-pwa) [![npm](https://img.shields.io/npm/dw/eslint-config-quintoandar-pwa.svg)](https://www.npmjs.com/package/eslint-config-quintoandar-pwa)
![eslint-config-quintoandar-pwa-badge]

This package provides QuintoAndar's .eslintrc for PWA as an extensible shared config.

## Install

```shell
  npm install --save-dev eslint-config-quintoandar-pwa
```

### Peer dependencies

Install the correct versions of each package required, which are listed by the command:

```shell
npm info "eslint-config-quintoandar-pwa@latest" peerDependencies
```

You can use this shortcut in NPM+5 to install all peer deps:

```shell
npx install-peerdeps --dev eslint-config-quintoandar-pwa
```

## Usage

In your project, create a file `.eslintrc.json` and extends this project:

```es6
{
  "extends": "eslint-config-quintoandar-pwa"
}
```

## What configs and rules?

We extends Airbnb's configs and add new rules specific to QuintoAndar's PWA projects.

## Badges
![eslint-config-quintoandar-pwa-badge]

[eslint-config-quintoandar-pwa-badge]: https://img.shields.io/badge/code%20style-eslint--config--quintoandar--pwa-5063f0.svg

Add the following line in your markdown readme:

```md
![eslint-config-quintoandar-pwa-badge](https://img.shields.io/badge/code%20style-eslint--config--quintoandar--pwa-5063f0.svg)
```

## Roadmap

- [ ] Enforce to do not use dispatch inside components folder or inside react component in containers folder
- [ ] Quantity of lines + Line lenght
- [ ] Object destructing limit
- [ ] Libraries imports ordering
- [ ] ..

