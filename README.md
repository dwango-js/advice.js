# advice.js

[![Build Status](https://travis-ci.org/dwango-js/advice.js.svg)](https://travis-ci.org/dwango-js/advice.js)

Simple AOP library for both Node.js and browsers.

```js
function base() {}

// compose a new function which calls a function after base returns
var fn = advice.after(base, function() {
  console.log('base was called');
});


var obj = {
  foo: function() {}
};

// redefine a method which calls a function after obj.foo returns
advice.after(obj, 'foo', function() {
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

### advice.before(base, fn)

### advice.before(obj, method, fn)

### advice.after(base, fn)

### advice.after(obj, method, fn)

### advice.around(base, fn)

### advice.around(obj, method, fn)

## License

MIT
