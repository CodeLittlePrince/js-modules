define(function(require, factory) {
  console.log('a')
  var b = require('b')
  return {
    speak: b.speak
  }
});