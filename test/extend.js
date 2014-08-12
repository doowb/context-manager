/*!
 * context-manager <https://github.com/jonschlinkert/context-manager>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var Context = require('..');
var context = new Context();

describe('context data', function() {
  beforeEach(function() {
    context.clear();
  });

  describe('.extend()', function() {
    it('should extend an object on the `ctx` object.', function() {
      context
        .add('a', 1)
        .add('b', 2)
        .add('c', 3)
        .add('c', 4)
        .add('e', 5);

      context.extend('a', {aaa: 'aaa'});
      context.extend('a', {bbb: 'bbb'});

      context.extend('b', {ccc: 'cdd'});
      context.extend('b', {ddd: 'ddd'});

      context.get('a').should.have.property('aaa');
      context.get('a').should.have.property('bbb');
      context.get('b').should.have.property('ccc');
      context.get('b').should.have.property('ddd');
    });

    it('should be chainable', function() {
      context
        .add('a', 1)
        .add('b', 2)
        .add('c', 3)
        .add('c', 4)
        .add('e', 5);

      context
        .extend('a', {aaa: 'aaa'})
        .extend('a', {bbb: 'bbb'})

        .extend('b', {ccc: 'cdd'})
        .extend('b', {ddd: 'ddd'});

      context.get('a').should.have.property('aaa');
      context.get('a').should.have.property('bbb');
      context.get('b').should.have.property('ccc');
      context.get('b').should.have.property('ddd');
    });

    it('should create the object if it does not already exist.', function() {
      context
        .extend('j', {aaa: 'aaa'})
        .extend('j', {bbb: 'bbb'})

        .extend('l', {ccc: 'cdd'})
        .extend('l', {ddd: 'ddd'});

      context.get('j').should.have.property('aaa');
      context.get('j').should.have.property('bbb');
      context.get('l').should.have.property('ccc');
      context.get('l').should.have.property('ddd');
    });
  });
});
