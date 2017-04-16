'use strict';

var slice = Array.prototype.slice;

var bind = Function.prototype.bind || function (context, fn) {
  return function () {
    var args = slice.call(arguments);
    return fn.apply(context, args);
  }
};

function before(base, fn) {
  return function() {
    var args = slice.call(arguments);
    fn.apply(this, args);
    return base.apply(this, args);
  };
}

function after(base, fn) {
  return function() {
    var args = slice.call(arguments);
    var result = base.apply(this, args);
    fn.apply(this, args);
    return result;
  };
}

function around(base, fn) {
  return function() {
    var args = slice.call(arguments);
    args.unshift(base);
    return fn.apply(this, args);
  };
}

function create(advice) {
  return function(context, name, fn) {
    if ('function' === typeof name) {
      return advice(context, name);
    } else {
      return advice(bind(context, context[name]), bind(context, fn));
    }
  };
}

exports.before = create(before);
exports.after = create(after);
exports.around = create(around);
