ES6-import-node -- 在node中的es6 import
---
### 介绍
毕竟node也是JavaScript，浏览器都支持import了，作为后端语言，不支持也不好意思吧。
当然，为了大一统，也是毕竟要做的一件事。

emmm，不过这个import真正被引入进Node其实挺晚的，实在v13才开始，以下是overflow里的引用。

> Node.js >= v13
> 
> It's very simple in Node.js 13 and above. You need to either:
>
>Save the file with .mjs extension, or
>Add { "type": "module" } in the nearest package.json.
>You only need to do one of the above to be able to use ECMAScript modules.
>
>Node.js <= v12
>
>If you are using Node.js version 8-12, save the file with ES6 modules with .mjs extension and run it like:
>
>`node --experimental-modules my-app.mjs`

1.我们我们直接在控制台用（如果node版本为13及以上，可以不用参数）：
```shell
node --experimental-modules index.mjs
```

主js：
```js
// index.js
console.log('index')

// 加载入口模块
import a from './a.js'

console.log('index call')

a.speak()
```

模块a：
```js
// a.js
console.log('a')

import b from './b.js'
import c from './c.js'

console.log('a call')

export default {
  speak: b.speak,
  say: c.say
}
```

模块b：
```js
// b.js
console.log('b')

module.exports = {
  speak: function () {
    console.log('Hello World')
  }
};
```

模块c：
```js
// c.js
console.log('c')

module.exports = {
  say: function () {
    console.log('Wow')
  }
};
```

最终，浏览器`Console`会打印出：
```js
b
c
a
a call
index
index call
Hello World
```
并不像commonjs，这里的结果和浏览器端的表现一模一样。