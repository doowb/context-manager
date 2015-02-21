/*!
 * context-manager <https://github.com/assemble/context-manager>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var Context = require('./');

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


// context
//   .setContext('defaults', 120)
//   .setContext('.create()', 110)
//   .setContext('.engine() locals', 100)
//   .setContext('.engine() options', 90)
//   .setContext('.engine()', 80)
//   .setContext('page', 70)
//   .setContext('partial', 60)
//   .setContext('layout', 50)
//   .setContext('front matter', 40)
//   .setContext('template locals', 30)
//   .setContext('template data', 20)
//   .setContext('.compile()', 10)
//   .setContext('.render()', 0)

// context
//   .extendContext('defaults',          {title: 'defaults'})
//   .extendContext('.create()',         {title: '.create()'})
//   .extendContext('.engine() locals',  {title: '.engine() locals'})
//   .extendContext('.engine() options', {title: '.engine() options'})
//   .extendContext('.engine()',         {title: '.engine()'})
//   .extendContext('page',              {title: 'page'})
//   .extendContext('partial',           {title: 'partial'})
//   .extendContext('layout',            {title: 'layout'})
//   .extendContext('front matter',      {title: 'front matter'})
//   .extendContext('template locals',   {title: 'template locals'})
//   .extendContext('template data',     {title: 'template data'})
//   .extendContext('.compile()',        {title: '.compile()'})
//   .extendContext('.render()',         {title: '.render()'});


// // console.log(context.get());
// // console.log(context.calculate());

// // console.log(context.calculate(['defaults', 'data']));

// // console.log(context.sortedKeys());


// // context.reset('partial');
// // context.extendContext('partial', {});


// // var c = context.calculate(['defaults', 'data', 'partial'], {fn: sortDesc});
// // var c = context.calculate(['defaults', 'layout', '.render()'], sortDesc);
// // var c = context.calculate(['defaults', 'layout', '.render()']);
// // var c = context.calculate(sortAsc);
// var c = context.calculate();

// console.log(c);


context
  .setContext('a', 1)
  .setContext('b', 2)
  .setContext('c', 3)
  .setContext('d', 4)
  .setContext('e', 5)

context
  .extendContext('a', {title: 'a'})
  .extendContext('b', {title: 'b'})
  .extendContext('c', {title: 'c'})
  .extendContext('d', {title: 'd'})
  .extendContext('e', {title: 'e'});

var sortAsc = require('sort-asc');
var sortDesc = require('sort-desc');

// var ctx = context.calculate(sortAsc);
var ctx = context.getContext();

console.log(ctx)
