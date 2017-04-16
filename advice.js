(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.advice = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});