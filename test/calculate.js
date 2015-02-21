/*!
 * context-manager <https://github.com/assemble/context-manager>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var Context = require('..');
var app = new Context();

describe('.calculate()', function() {
  beforeEach(function() {
    app
      .setContext('a', 1)
      .setContext('b', 2)
      .setContext('c', 3)

    app.extendContext('a', {foo: 'aaa', one: 'two'});
    app.extendContext('b', {foo: 'bbb', bar: 'BBB'});
    app.extendContext('c', {foo: 'ccc', bar: 'CCC'});
  });

  it('should calculate the context for a single level.', function() {
    app.calculate('a').should.eql({foo: 'aaa', one: 'two'});
  });

  it('should calculate the context for an array of levels.', function() {
    app.calculate(['a']).should.eql({foo: 'aaa', one: 'two'});
    app.calculate(['a', 'b']).should.eql({foo: 'bbb', one: 'two', bar: 'BBB'});
    app.calculate(['a', 'c']).should.eql({foo: 'ccc', one: 'two', bar: 'CCC'});
    app.calculate(['a', 'b', 'c']).should.eql({foo: 'ccc', one: 'two', bar: 'CCC'});
  });

  it('should calculate the context for all levels.', function() {
    app.calculate().should.eql({foo: 'ccc', one: 'two', bar: 'CCC'});
  });

  it('should calculate in order of the provided keys:', function() {
    app.calculate(['a']).should.eql({foo: 'aaa', one: 'two'});
    app.calculate(['b', 'a']).should.eql({foo: 'aaa', one: 'two', bar: 'BBB'});
    app.calculate(['c', 'a']).should.eql({foo: 'aaa', one: 'two', bar: 'CCC'});
    app.calculate(['c', 'b']).should.eql({foo: 'bbb', bar: 'BBB'});
  });

  it('should use a custom sorting function.', function() {
    app.calculate(function(a, b) {
      return app.lvl[a] - app.lvl[a];
    }).should.eql({foo: 'ccc', one: 'two', bar: 'CCC'});

    app.calculate(['a', 'b'], function(a, b) {
      return app.lvl[a] - app.lvl[a];
    }).should.eql({foo: 'bbb', one: 'two', bar: 'BBB'});

    app.calculate(['a', 'b'], function(a, b) {
      return app.lvl[b] - app.lvl[a];
    }).should.eql({foo: 'aaa', one: 'two', bar: 'BBB'});
  });
});