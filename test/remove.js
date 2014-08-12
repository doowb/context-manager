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

describe('context remove', function() {
  beforeEach(function() {
    context.clear();
  });

  describe('.remove()', function() {
    it('should remove a property from the `ctx` object.', function() {
      context.add('a', 1);
      context.add('b', 2);
      context.ctx.should.have.property('a');
      context.ctx.should.have.property('b');
      Object.keys(context.ctx).length.should.equal(2);

      context.remove('a');
      context.ctx.should.not.have.property('a');
      context.ctx.should.have.property('b');
      Object.keys(context.ctx).length.should.equal(1);

      context.remove('b');
      context.ctx.should.not.have.property('a');
      context.ctx.should.not.have.property('b');
      Object.keys(context.ctx).length.should.equal(0);
    });
  });
});
