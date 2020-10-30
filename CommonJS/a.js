console.log('a')

var b = require('./b')
var c = require('./c')

// var flag = false
// if (flag) {
//   var c = require('./c')
//   c.say()
// }

console.log('a call')

module.exports = {
  speak: b.speak,
  say: c.say
}