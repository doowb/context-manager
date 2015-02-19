/*!
 * context-manager <https://github.com/assemble/context-manager>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var Context = require('..');
var context = new Context();

describe('context add', function() {
  beforeEach(function() {
    context.resetContexts();
  });

  describe('.setContext()', function() {
    it('should add an object to the `ctx` object.', function() {
      context.setContext('a', 1);
      context.setContext('b', 2);
      context.setContext('c', 3);
      context.setContext('d', 4);

      context.ctx.should.have.property('a');
      context.ctx.should.have.property('b');
      context.ctx.should.have.property('c');
      context.ctx.should.have.property('d');
      Object.keys(context.ctx).length.should.equal(4);
    });

    it('should be chainable.', function() {
      context
        .setContext('a', 1)
        .setContext('b', 2)
        .setContext('c', 3)
        .setContext('d', 4);

      context.ctx.should.have.property('a');
      context.ctx.should.have.property('b');
      context.ctx.should.have.property('c');
      context.ctx.should.have.property('d');
      Object.keys(context.ctx).length.should.equal(4);
    });
  });
});