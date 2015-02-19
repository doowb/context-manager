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

describe('.extendContext()', function() {
  beforeEach(function() {
    context.resetContexts();
  });

  describe('.extendContext()', function() {
    it('should extend an object on the `ctx` object.', function() {
      context
        .setContext('a', 1)
        .setContext('b', 2)
        .setContext('c', 3)
        .setContext('c', 4)
        .setContext('e', 5);

      context.extendContext('a', {aaa: 'aaa'});
      context.extendContext('a', {bbb: 'bbb'});

      context.extendContext('b', {ccc: 'cdd'});
      context.extendContext('b', {ddd: 'ddd'});

      context.getContext('a').should.have.property('aaa');
      context.getContext('a').should.have.property('bbb');
      context.getContext('b').should.have.property('ccc');
      context.getContext('b').should.have.property('ddd');
    });

    it('should be chainable', function() {
      context
        .setContext('a', 1)
        .setContext('b', 2)
        .setContext('c', 3)
        .setContext('c', 4)
        .setContext('e', 5);

      context
        .extendContext('a', {aaa: 'aaa'})
        .extendContext('a', {bbb: 'bbb'})

        .extendContext('b', {ccc: 'cdd'})
        .extendContext('b', {ddd: 'ddd'});

      context.getContext('a').should.have.property('aaa');
      context.getContext('a').should.have.property('bbb');
      context.getContext('b').should.have.property('ccc');
      context.getContext('b').should.have.property('ddd');
    });

    it('should create the object if it does not already exist.', function() {
      context
        .extendContext('j', {aaa: 'aaa'})
        .extendContext('j', {bbb: 'bbb'})

        .extendContext('l', {ccc: 'cdd'})
        .extendContext('l', {ddd: 'ddd'});

      context.getContext('j').should.have.property('aaa');
      context.getContext('j').should.have.property('bbb');
      context.getContext('l').should.have.property('ccc');
      context.getContext('l').should.have.property('ddd');
    });
  });
});