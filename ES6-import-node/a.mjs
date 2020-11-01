console.log('a')

import b from './b'
import c from './c'

console.log('a call')

export default {
  speak: b.speak,
  say: c.say
}