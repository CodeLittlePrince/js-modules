ES6-import-webpack -- 在webpack中的es6 import
---
### 介绍
简单地说，就是因为es6虽然有import的能力了，但是因为兼容性不好，所以，目前市面上，都会选择用webpack来做js的模块化，这样对开发者来说，就可以愉快的使用import了。

1.html引入`主js`:
```html
<script src="/ES6-import-webpack/index.js"></script>
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

// var flag = true
// if (flag) {
//   import('./c.js')
//   .then(c => {
//     c.default.say()
//   });
// }

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

### 使用webpack打包
可以自行全局安装，或者局部安装webpack、webpack-cli。然后以index.js作为入口文件，编辑生成代码。

这里，我就直接生成了，文件为dist/main.js。

我们看下打包后的文件：
```js
(() => {
  "use strict";
  console.log("b");
  const o = {
    speak: function () {
      console.log("Hello World")
    }
  };
  console.log("c");
  const l = {
    say: function () {
      console.log("Wow")
    }
  };
  console.log("a"), console.log("a call");
  const s = {
    speak: o.speak,
    say: l.say
  };
  console.log("index"), console.log("index call"), s.speak()
})();
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
其实是和es6 import一模一样的。

### 过程
1. script标签加载index.js，然后顺序执行。

### 优点
1. **兼容性**：可认为除杠精浏览器外的所有版本浏览器；

2. **零语法学习成本**：和es6的模块化方式一模一样，没有语法上的学习成本；

3. **按需加载**：比如：if(false){ import('a.js') }，这样的写法就不去加载c.js的文件了；

3. **引入模块代码按顺序执行**：虽然还是不能解决：虽然console.log('a')在import之前，但执行却晚于这两个模块执行，但是，至少不会因为b、c可能因为文件大小或者网络原因，导致这两个文件执行顺序有有变化。

### 缺点
1. **提升页面响应速度**：js都被加入一个文件中了，在目前http2.0时代，并不见得是一件好事；
2. **学习成本**：还得学webpack；