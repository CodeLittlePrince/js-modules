console.log('a')

define(function(require, factory) {
  console.log('a call')

  var b = require('b')
  var c = require('c')

  // var flag = false
  // if (flag) {
  //   var c = require.async('c')
  //   c.say()
  // }

  return {
    speak: b.speak,
    say: c.say
  }
});