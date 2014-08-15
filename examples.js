
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
  .add('global', 10)
  .add('data', 20)
  .add('locals', 30)
  .add('page', 40)
  .add('partial', 50)
  .add('layout', 60)
  .add('matter', 70);


context.extend('global', {title: 'Global title'});
context.extend('data', {title: 'Data title'});
context.extend('locals', {title: 'Locals title'});
context.extend('matter', {title: 'Matter title'});
context.extend('layout', {title: 'Layout title'});


// console.log(context.get());
// console.log(context.calculate());

// console.log(context.calculate(['global', 'data']));

// console.log(context.sortedKeys());


// context.reset('partial');
// context.extend('partial', {});

var sortAsc = require('sort-asc');
var sortDesc = require('sort-desc');

// var c = context.calculate(['global', 'data', 'partial'], {fn: sortDesc});
var c = context.calculate(['global', 'layout', 'data'], sortAsc);

console.log(c);
