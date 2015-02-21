/*!
 * context-manager <https://github.com/assemble/context-manager>
 *
 * Copyright (c) 2015, Jon Schlinkert, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var pad = require('pad-left');
var _ = require('lodash');

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
 * @param {String} `name` The name of the context to add.
 * @param {Number} `level` Numerical value representing the order in which this level should be merged versus other lvl.
 * @param {Object} `value` Optionally pass an object to start with.
 * @api public
 */

Context.prototype.setContext = function (name, level, value) {
  this.ctx[name] = value || {};
  this.setLevel(name, level);
  return this;
};

/**
 * Get the raw (un-merged) context for `name`.
 *
 * ```js
 * context.setContext('a', {a: 'b'});
 * context.getContext('a');
 * // => {a: 'b'}
 * ```
 *
 * @param {String} `name` The context to get.
 * @return {*}
 * @api public
 */

Context.prototype.getContext = function (name) {
  return name ? this.ctx[name] : this.ctx;
};

/**
 * Extend context `name` with the given `value`
 *
 * ```js
 * context.setContext('locals', {a: 'b'});
 * ```
 *
 * @param  {String} `name`
 * @param  {String} `key`
 * @param  {Object} `value`
 * @return {String}
 * @api public
 */

Context.prototype.extendContext = function (name, key, value) {
  if(!this.ctx.hasOwnProperty(name)) {
    throw new Error('[context-manager] context level "' + name + '" does not exist.');
  }
  if (arguments.length === 2) {
    _.merge(this.ctx[name], key);
  } else {
    this.ctx[name][key] = value;
  }
  return this;
};

/**
 * Set the level for a context. This determines the order in which
 * the context will be merged when `.calculate()` is called.
 *
 * ```js
 * if (foo) {
 *   context.setLevel('locals', 10);
 * } else {
 *   context.setLevel('locals', 0);
 * }
 * ```
 *
 * @param {String} `name` The name of the context.
 * @param {Number} `level` The level (number) to set for the level.
 * @api public
 */

Context.prototype.setLevel = function (name, level) {
  this.lvl[name] = formatLevel(level, this.options.padding);
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
    return ~~this.lvl[a] - ~~this.lvl[b];
  }.bind(this));
};

/**
 * Calculate the context, optionally passing a callback `fn` for sorting.
 * _(Note that sorting must be done on levels, not on the context names)_.
 *
 * ```js
 * app.calculate(['a', 'b'], function(a, b) {
 *   return app.lvl[a] - app.lvl[a];
 * });
 * ```
 *
 * @param {String|Array} `keys` Key, or array of keys for context levels to include.
 * @param {Function} `fn` Sort function for determining the order of merging.
 * @api public
 */

Context.prototype.calculate = function (keys, fn) {
  if (typeof keys === 'function') {
    fn = keys; keys = null;
  }

  if (typeof keys === 'string') {
    keys = [keys];
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