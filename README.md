# advice.js

[![Build Status](https://travis-ci.org/dwango-js/advice.js.svg)](https://travis-ci.org/dwango-js/advice.js)

Simple AOP library for both Node.js and browsers.

- [Aspect-oriented programming - Wikipedia](http://en.wikipedia.org/wiki/Aspect-oriented_programming "Aspect-oriented programming - Wikipedia, the free encyclopedia")

```js
function base() {}

// compose a new function which calls a function after base returns
var fn = advice.after(base, function() {
  console.log('base was called');
});


var obj = {
  foo: function() {}
};

// compose a new function which calls a function after obj.foo returns
var fn = advice.after(obj, 'foo', function() {
  console.log('obj.foo was called');
});
```

## Installation

### Node

```sh
$ npm install advice.js
```

### Bower

```sh
$ bower install advice
```

## Documentation

### advice.before(base, fn) : function

Return compose a new function which calls a `fn` before `base` returns.

Order: `fn` -> `base`

### advice.before(obj, method, fn) : function

Return compose a new function which will call an `fn` before the original `obj.method` is called.

Order: `fn` -> `obj.method`

### advice.after(base, fn) : function

Return compose a new function which calls a `fn` after `base` returns.

Order: `base` -> `fn`

### advice.after(obj, method, fn) : function

Return compose a new function which will call an `fn` after the original `obj.method` is called.

Order: `obj.method` ->  `fn`

### advice.around(base, fn) : function

Return compose a new function which will be called around the `base` by `fn`.

```js
function base() {}
var results = [];
var fn = advice.around(base, function(base, value) {
  var result = 'around: ' + value;
  // before
  results.push('before: ' + value);
  // base
  base('base was called');
  // after 
  results.push('after: ' + value);
  return result;
});
fn('foo'); // 'around: foo'
results.join(', ');// 'before: foo, base: bar, after: foo'
```

### advice.around(obj, method, fn) : function

Return compose a new function which will be called around the `obj.method` by `fn`.


## Tests

```sh
npm test
```

## License

MIT
