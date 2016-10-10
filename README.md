[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

# nano-md5
md5/md5crypt functions. UTF8 compatible. Small. Fast. 100% tests coverage. No dependencies.

## Example

```js
> var md5 = require('nano-md5');
> md5('hello');
'5d41402abc4b2a76b9719d911017c592'
> md5.fromBytes('hello').toHex()
'5d41402abc4b2a76b9719d911017c592'
> md5.fromUtf8('hello').toHex()
'5d41402abc4b2a76b9719d911017c592'
```

## API

### md5(utf8_string)

* utf8_string `String`

Returns hexadecimal value of utf8_string MD5 hash. The function is a shortcut for `md5.fromUtf8(utf8_string).toHex()` call.

```js
> var md5 = require('nano-md5');
> md5('hello');
'5d41402abc4b2a76b9719d911017c592'
```


### md5.fromBytes(bytes_string)

* bytes_string `String` -- supports only 8-bits characters

Returns binary String object of MD5 hash containings of `toHex()` method for converting binary value to hexadecimal string value.

```js
> var md5 = require('nano-md5');
> md5.fromBytes('hello');
{ [String: ']A@*¼K*v¹q��\u0010\u0017Å�'] toHex: [Function] }
> md5.fromBytes('hello').toHex()
'5d41402abc4b2a76b9719d911017c592'
```

### md5.fromUtf8(utf8_string)

* utf8_string `String`

Returns binary String object of MD5 hash containings of `toHex()` method for converting binary value to hexadecimal string value.

```js
> var md5 = require('nano-md5');
> md5.fromBytes('русский');
{ [String: '4�·�® \u0000>\u001eU\u001bÏM¡a'] toHex: [Function] }
> md5.fromBytes('русский').toHex()
'3495b78aaea0003e1e551bcf4da18861'
```

### md5.crypt(password, setting)

* password `String`
* setting `String` - salt or '$1$'+salt; can be closed with '$' symbol

The function is analogue of `md5crypt` unix libc function. Very useful for passwords crypting and checking.

The `setting` argument isn`t necessary. If it skipped a salt value will generated automatically.

```js
> var md5 = require('nano-md5');
> md5.crypt('hello')
'$1$DgPzWoiS$bMN29fSiiniXY6s.4ShyE1'
> md5.crypt('hello')
'$1$nFQVmGdu$m0QpoNNUJ6Ij8ZWh0wavS0'
> md5.crypt('hello')
'$1$FmEgm6OI$rvKvF85/aj2n8/64VEytt/'
> md5.crypt('hello', '01234567')
'$1$01234567$8imesxsCtZWLDOPevHEvu.'
> md5.crypt('hello', '01234567')
'$1$01234567$8imesxsCtZWLDOPevHEvu.'
> md5.crypt('hello', '$1$01234567')
'$1$01234567$8imesxsCtZWLDOPevHEvu.'
> md5.crypt('hello', md5.crypt('hello', '$1$01234567')) // crypted password can be used as salt source
'$1$01234567$8imesxsCtZWLDOPevHEvu.'
```


[bithound-image]: https://www.bithound.io/github/Holixus/nano-md5/badges/score.svg
[bithound-url]: https://www.bithound.io/github/Holixus/nano-md5

[gitter-image]: https://badges.gitter.im/Holixus/nano-md5.svg
[gitter-url]: https://gitter.im/Holixus/nano-md5

[npm-image]: https://badge.fury.io/js/nano-md5.svg
[npm-url]: https://badge.fury.io/js/nano-md5

[github-tag]: http://img.shields.io/github/tag/Holixus/nano-md5.svg
[github-url]: https://github.com/Holixus/nano-md5/tags

[travis-image]: https://travis-ci.org/Holixus/nano-md5.svg?branch=master
[travis-url]: https://travis-ci.org/Holixus/nano-md5

[coveralls-image]: https://coveralls.io/repos/github/Holixus/nano-md5/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/Holixus/nano-md5?branch=master

[david-image]: https://david-dm.org/Holixus/nano-md5.svg
[david-url]: https://david-dm.org/Holixus/nano-md5

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE

[downloads-image]: http://img.shields.io/npm/dt/nano-md5.svg
[downloads-url]: https://npmjs.org/package/nano-md5
