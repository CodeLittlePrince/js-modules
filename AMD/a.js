console.log('a')

define(function(require, factory) {
  console.log('a call')

  var b = require('b')
  var c = require('c')

  return {
    speak: b.speak,
    say: c.say
  }
});