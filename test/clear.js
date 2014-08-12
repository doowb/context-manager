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

describe('context clear', function() {
  describe('.clear()', function() {
    it('should clear the `ctx` object.', function() {
      context.add('a', 1);
      context.add('b', 2);
      context.add('c', 3);

      context.ctx.should.have.property('a');
      context.ctx.should.have.property('b');
      context.ctx.should.have.property('c');
      Object.keys(context.ctx).length.should.equal(3);

      context.clear();
      Object.keys(context.ctx).length.should.equal(0);
    });
  });
});
