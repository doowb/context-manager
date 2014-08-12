/*!
 * context-cache <https://github.com/jonschlinkert/context-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var Context = require('..');
var context = new Context();

describe('context get', function() {
  beforeEach(function() {
    context.clear();
  });

  describe('.get()', function() {
    it('should get an object from the `ctx` object.', function() {
      context
        .add('a', 1)
        .add('b', 2)
        .add('c', 3)
        .add('d', 4);

      context
        .extend('a', {foo: 'bar'})
        .extend('b', {foo: 'bar'})
        .extend('c', {foo: 'bar'})
        .extend('d', {foo: 'bar'});

      context.get('a').should.be.an.object;
      context.get('b').should.be.an.object;
      context.get('c').should.be.an.object;
      context.get('d').should.be.an.object;

      context.get('a').should.have.property('foo');
      context.get('b').should.have.property('foo');
      context.get('c').should.have.property('foo');
      context.get('d').should.have.property('foo');
    });
  });
});
