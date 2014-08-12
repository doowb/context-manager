
var Context = require('./');
var _ = require('lodash');


var obj = {
  cache: {
    data: {},
  },
  options: {
    locals: {},
    data: {},
  }
};


/**
 * Global
 * Method
 * Helper
 * Template
 * Data
 * Locals
 * Front matter
 */

var context = new Context();


context
  .add('global', 1)
  .add('data', 2)
  .add('locals', 3)
  .add('page', 3)
  .add('partial', 3)
  .add('layout', 3);


context.extend('global', {title: 'Partial Slide Deck'});
context.extend('data', {title: 'Partial Data title'});
context.extend('locals', {title: 'Partial Locals title'});
context.extend('matter', {title: 'Partial Matter title'});


console.log(context.get());
// console.log(context.calculate());

console.log(context.calculate(['global', 'data']));

// console.log(context.sortedKeys());


context.reset('partial');
context.extend('partial', {});
var c = context.calculate(['global', 'data', 'partial']);

console.log(c);
