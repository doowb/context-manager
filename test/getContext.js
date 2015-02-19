/*!
 * context-manager <https://github.com/assemble/context-manager>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var should = require('should');
var Context = require('..');
var context = new Context();

describe('context get', function() {
  beforeEach(function() {
    context.resetContexts();
  });

  describe('.get()', function() {
    it('should get an object from the `ctx` object.', function() {
      context
        .setContext('a', 1)
        .setContext('b', 2)
        .setContext('c', 3)
        .setContext('d', 4);

      context
        .extendContext('a', {foo: 'bar'})
        .extendContext('b', {foo: 'bar'})
        .extendContext('c', {foo: 'bar'})
        .extendContext('d', {foo: 'bar'});

      context.getContext('a').should.be.an.object;
      context.getContext('b').should.be.an.object;
      context.getContext('c').should.be.an.object;
      context.getContext('d').should.be.an.object;

      context.getContext('a').should.have.property('foo');
      context.getContext('b').should.have.property('foo');
      context.getContext('c').should.have.property('foo');
      context.getContext('d').should.have.property('foo');
    });
  });
});