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

describe('context add', function() {
  beforeEach(function() {
    context.clear();
  });

  describe('.add()', function() {
    it('should add an object to the `ctx` object.', function() {
      context.add('a', 1);
      context.add('b', 2);
      context.add('c', 3);
      context.add('d', 4);

      context.ctx.should.have.property('a');
      context.ctx.should.have.property('b');
      context.ctx.should.have.property('c');
      context.ctx.should.have.property('d');
      Object.keys(context.ctx).length.should.equal(4);
    });

    it('should be chainable.', function() {
      context
        .add('a', 1)
        .add('b', 2)
        .add('c', 3)
        .add('d', 4);

      context.ctx.should.have.property('a');
      context.ctx.should.have.property('b');
      context.ctx.should.have.property('c');
      context.ctx.should.have.property('d');
      Object.keys(context.ctx).length.should.equal(4);
    });
  });
});
