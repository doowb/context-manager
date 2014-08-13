'use strict';

var _ = require('lodash');



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
 * @param {String} `type`
 * @param {Number} `level`
 * @param {Object} `value`
 */

Context.prototype.add = function (type, level, value) {
  this.levels[type] = level;
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
 * Extend the context.
 *
 * @api public
 */

Context.prototype.extend = function (type, value) {
  if(this.ctx.hasOwnProperty(type)) {
    this.levels[type] === 999;
    this.ctx[type] === {};
  }

  this.ctx[type] = _.extend({}, this.ctx[type], value);
  return this;
};


/**
 * Extend the context.
 *
 * @api public
 */

Context.prototype.extend = function (type, value) {
  if(this.ctx.hasOwnProperty(type)) {
    this.levels[type] === 999;
    this.ctx[type] === {};
  }

  this.ctx[type] = _.extend({}, this.ctx[type], value);
  return this;
};


/**
 * Calculate the context
 *
 * @api public
 */

Context.prototype.sortedKeys = function () {
  var keys = _.keys(this.levels);

  keys.sort(function(a, b) {
    return this.levels[a] > this.levels[b];
  }.bind(this));

  return keys;
};


/**
 * Calculate the context
 *
 * @api public
 */

Context.prototype.calculate = function (keys) {
  var keys = keys || this.sortedKeys();

  var o = {};
  keys.forEach(function(key) {
    var value = this.ctx[key];
    _.extend(o, value);
  }.bind(this));
  return o;
};


/**
 * Remove a context.
 *
 * @api public
 */

Context.prototype.reset = function (type) {
  this.ctx[type] = {};
};


/**
 * Remove a context.
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

module.exports = Context;