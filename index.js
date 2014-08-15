'use strict';

var _ = require('lodash');
var sortObj = require('sort-object');


/**
 * Create an instance of `Context`.
 *
 * @class `Context`
 * @api public
 */

function Context() {
  this.ctx = {};
  this.levels = {};
}


/**
 * Add a context level, optionally passing
 * a value to start with.
 *
 * ```js
 * context.add('locals', {a: 'b'});
 * ```
 *
 * @param {String} `type` The kind of context to add.
 * @param {Number} `level` Numerical value representing the order in which this level should be merged versus other levels.
 * @param {Object} `value` Optionally pass a starting object.
 */

Context.prototype.add = function (type, level, value) {
  this.levels[type] = Number(level);
  this.ctx[type] = value || {};
  return this;
};


/**
 * Return the context for `type`.
 *
 * ```js
 * context.set('a', {a: 'b'});
 * context.get('a');
 * // => {a: 'b'}
 * ```
 *
 * @param {String} `type` The context type to get.
 * @return {*}
 * @api public
 */

Context.prototype.get = function (type) {
  if (!type) {
    return this.ctx;
  }
  return this.ctx[type];
};


/**
 * Set the level (number) for the specified context `type`.
 *
 * ```js
 * context.set('a', {a: 'b'});
 * context.get('a');
 * // => {a: 'b'}
 * ```
 *
 * @param {String} `type` The context type to get.
 * @return {Number} `num`
 * @api public
 */

Context.prototype.setLevel = function (type, num) {
  this.levels[type] = num;
  return this;
};


/**
 * Get the level (number) for the specified context `type`.
 *
 * ```js
 * context.setLevel('a', 1);
 * context.getLevel('a');
 * // => '1'
 * ```
 *
 * @param {String} `type` The context type to get.
 * @return {Number}
 * @api public
 */

Context.prototype.getLevel = function (type) {
  return this.levels[type];
};


/**
 * Extend a context.
 *
 * @api public
 */

Context.prototype.extend = function (type, value) {
  if(!this.ctx.hasOwnProperty(type)) {
    this.levels[type] = 999;
    this.ctx[type] = value;
    return this;
  }

  _.extend(this.ctx[type], value);
  return this;
};


/**
 * Calculate the context
 *
 * @api public
 */

Context.prototype.calculate = function (keys, fn) {
  if (typeof keys === 'function') {
    fn = keys;
    keys = this.sortKeys(fn);
  }

  var obj = sortObj(this.ctx, {keys: keys, fn: fn});
  var o = {};

  _.forIn(obj, function(value) {
    _.extend(o, value);
  });

  return o;
};


/**
 * Reset a context level.
 *
 * @api public
 */

Context.prototype.reset = function (type) {
  this.ctx[type] = {};
};


/**
 * Remove a context level.
 *
 * @api public
 */

Context.prototype.remove = function (type) {
  delete this.levels[type];
  delete this.ctx[type];
};


/**
 * Clear all contexts.
 *
 * @api public
 */

Context.prototype.clear = function () {
  this.levels = {};
  this.ctx = {};
  return this;
};


/**
 * Export `Context`
 *
 * @type {Object}
 */

module.exports = Context;