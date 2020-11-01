ES6 import
---
### 定义
[JavaScript modules](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)

1.html引入`主js`:
```html
<script type="module" src="/ES6-import/index.js"></script>
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

### 过程
1. script标签加载index.js，值得注意的是script标签多了一个type="module"的属性。index.js通过type="module"的方式引入，从而自身也是一个模块化的文件，这点我们可以在index.js文件里用var创建一个变量，比如var x = 7来验证，我们会发现所有文件执行完后，我们在控制台中输入x，输出的是x is not defined。
2. index.js import了a，import会被最先执行，所以虽然console.log('index')在import之前，确实等a加载执行完之后才开始被执行。
3. a.js加载完后，同样的，虽然console.log('a')在import之前，但得等b、c都加载执行完之后才开始被执行。b、c是异步请求的，但和AMD还有CMD不一样的是，它的执行并不会因为c先于b加载完而先执行c文件。而是按照代码顺序，直到b加载执行完，才轮到c。因此打印出了：b => c => a => a call。
4. a执行完后，再回到index开始执行，所以继续打印：index => index call => Hello World

### 优点
1. **提升页面响应速度**：js文件异步加载；

2. **模块化成本低**：原生支持；

3. **按需加载**：比如：if(false){ import('a.js') }，这样的写法就不去加载c.js的文件了；

4. **引入模块代码按顺序执行**：虽然还是不能解决：虽然console.log('a')在import之前，但执行却晚于这两个模块执行，但是，至少不会因为b、c可能因为文件大小或者网络原因，导致这两个文件执行顺序有有变化。

### 缺点
1. **兼容性**：高版本浏览器；(但感谢webpack，可以忽略兼容性)