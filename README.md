[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][github-image]][github-url]
[![Test Coverage][coveralls-image]][coveralls-url]

#Usage
```
const input = `.class1{} .class2{}`
const output = await postcss(postcssWrap({
  type: 'atrule',
  props: {
    name: 'media',
    params: '(prefers-color-scheme: dark)',
  },
})).process(input)

// output: @media (prefers-color-scheme: dark) {.class1{} .class2{}}
```

```
const input = `.class1{} .class2{}`
const output = await postcss(postcssWrap({
  type: 'rule',
  props: {
    name: 'media',
    selectors: ['.app', '.dev'],
  },
})).process(input)

// output: .app, .dev {.class1{} .class2{}}
```

[npm-image]: https://img.shields.io/npm/v/@flemist/postcss-wrap.svg
[npm-url]: https://npmjs.org/package/@flemist/postcss-wrap
[downloads-image]: https://img.shields.io/npm/dm/@flemist/postcss-wrap.svg
[downloads-url]: https://npmjs.org/package/@flemist/postcss-wrap
[github-image]: https://github.com/NikolayMakhonin/postcss-wrap/actions/workflows/test.yml/badge.svg
[github-url]: https://github.com/NikolayMakhonin/postcss-wrap/actions
[coveralls-image]: https://coveralls.io/repos/github/NikolayMakhonin/postcss-wrap/badge.svg
[coveralls-url]: https://coveralls.io/github/NikolayMakhonin/postcss-wrap
