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

describe('.calculate()', function() {
  it('should calculate the context based on the provided levels.', function() {
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
    context.extendContext('d', {eee: 'eee'});
    context.extendContext('e', {fff: 'fff'});
    console.log(context)

    var res = context.calculate(['a', 'b']);
    console.log(res)
  });
});