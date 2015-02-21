/*!
 * context-manager <https://github.com/assemble/context-manager>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var _ = require('lodash');
var merge = require('merge-deep');
var pad = require('pad-left');

/**
 * Create an instance of `Context`.
 *
 * @class `Context`
 * @api public
 */

function Context(options) {
  this.options = options || {};
  this.ctx = {};
  this.lvl = {};
}

/**
 * Add a context level, optionally passing
 * a value to start with.
 *
 * ```js
 * context.setContext('locals', {a: 'b'});
 * ```
 *
 * @param {String} `type` The kind of context to add.
 * @param {Number} `level` Numerical value representing the order in which this level should be merged versus other lvl.
 * @param {Object} `value` Optionally pass an object to start with.
 */

Context.prototype.setContext = function (type, level, value) {
  this.lvl[type] = formatLevel(level, this.options.padding);
  this.ctx[type] = value || {};
  return this;
};

/**
 * Return the context for `type`.
 *
 * ```js
 * context.setContext('a', {a: 'b'});
 * context.getContext('a');
 * // => {a: 'b'}
 * ```
 *
 * @param {String} `type` The context type to get.
 * @return {*}
 * @api public
 */

Context.prototype.getContext = function (type) {
  return type ? this.ctx[type] : this.ctx;
};

/**
 * Extend a context with the given `value`
 *
 * @api public
 */

Context.prototype.extendContext = function (type, key, value) {
  if(!this.ctx.hasOwnProperty(type)) {
    throw new Error('context level "' + type + '" has not been defined.');
  }
  if (arguments.length === 2) {
    _.merge(this.ctx[type], key);
  } else {
    this.ctx[type][key] = value;
  }
  return this;
};

/**
 * Sort the keys in the given object or `lvl`.
 *
 * @api private
 */

Context.prototype.sortKeys = function (keys, fn) {
  if (Array.isArray(keys)) {
    return typeof fn === 'function' ? keys.sort(fn) : keys;
  }
  return Object.keys(this.ctx).sort(fn || function (a, b) {
    return ~~(+this.lvl[a]) - ~~(+this.lvl[b]);
  }.bind(this));
};

/**
 * Calculate the context, optionally passing a
 * callback `fn` for sorting.
 *
 * @param {String} `keys` Optionally pass an array of keys for context levels to include.
 * @param {Function} `fn` Callback function for determining the order of merging.
 * @api public
 */

Context.prototype.calculate = function (keys, fn) {
  if (typeof keys === 'function') {
    fn = keys; keys = null;
  }

  keys = this.sortKeys(keys, fn);
  var o = {};

  keys.forEach(function(key) {
    _.merge(o, this.ctx[key]);
  }.bind(this));
  return o;
};

/**
 * Clear all contexts.
 *
 * @api public
 */

Context.prototype.resetContexts = function () {
  this.lvl = {};
  this.ctx = {};
  return this;
};

/**
 * Correctly format a level.
 */

function formatLevel(lvl, amount) {
  return padding(Math.abs(lvl) >> 0, amount);
}

/**
 * Apply padding to a level
 */

function padding(val, amount) {
  return pad(val, (amount || 3) - length(val), '0');
}

/**
 * Get the string length of `val`
 */

function length(val) {
  return val.toString().length;
}

/**
 * Export `Context`
 *
 * @type {Object}
 */

module.exports = Context;