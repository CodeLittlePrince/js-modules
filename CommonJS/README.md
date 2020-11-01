CommonJS
---
### 定义
[CommonJS](http://www.commonjs.org/)

### 用法
1.因为commonjs是node的模块化方式，我们我们直接在控制台用：
```shell
node index.js
```

主js：
```js
// index.js
console.log('index')

// 加载入口模块
var a = require('./a')

console.log('index call')

a.speak()
```

模块a：
```js
// a.js
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

最终，控制台会打印出：
```js
index
a
b
c
a call
index call
Hello World
```

### 过程
1. node执行入口文件index.js。
2. 之后的代码全都按照顺序执行，没有什么弯子。

### 和AMD、CMD的区别
1. **使用场景不同**：commonjs用于node，即后端。
2. **模块同步加载**：因为不需要像浏览器端那样考虑文件请求性能而做成异步加载。
3. **代码顺序执行**：所有的代码全都按照顺序执行，没有花花肠子，直男。