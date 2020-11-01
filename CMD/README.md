CMD
---
### 定义
[cmdjs specification](https://github.com/cmdjs/specification/blob/master/draft/module.md)

### 用法
1.html引入`seajs`和`主js`:
```html
<script src="/seajs.js"></script>
<script src="/index.js"></script>
```

主js：
```js
// index.js
console.log('index')

// 加载入口模块
seajs.use(['a'], function(a) {
  console.log('index call')

  a.speak()
});
```

模块a：
```js
// a.js
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
```

模块b：
```js
// b.js
define(function () {
  console.log('b')

  return {
    speak: function () {
      console.log('Hello World')
    }
  };
});
```

模块c：
```js
// c.js
console.log('c')

define(function () {
  console.log('c call')

  return {
    say: function () {
      console.log('Wow')
    }
  };
});
```

最终，浏览器`Console`会打印出：
```js
index
a
b
c
a call
b call
c call
index call
Hello World
```

### 过程
1. script标签加载sea.js。
2. script标签加载index.js。
3. index.js中通过seajs.use函数定义该文件为入口文件。所有子模块(a、b、c)加载方式其实是在`<head>`里append对应的js，并且带async属性。不过和requirejs不一样的是，seajs会用完后，把script给移除掉，为了减少内存占用。

4. js按照
index.js=>a.js=>b.js
              =>c.js
这样的顺序加载执行。所以，自然的先打印出index、a。又因为，b和c都是a所依赖的模块，所以b、c同时异步加载，谁加载完即先执行谁，因为两文件大小几乎一样，并且本地测试网络延迟可以忽略原因，先require谁就会先执行谁。

5. 和requirejs不一样的是，seajs不会加载完就立刻去执行define里的回调，而是等到父模块require的时候才去执行，所以我们看到，打印出的是a、b、c、a call、b call、c call。（上面说到，因为网络原因，c可能先于b加载完，那样的话打印出的就是a、c、b、a call、b call、c call）

6. index中的依赖逻辑处理完之后，才轮到index除了require之外的逻辑处理，所以继续打印出index call。

### 优点
1. **提升页面响应速度**：js文件异步加载；

2. **模块化成本低**：只需要引入require.js就可以实现模块化；

### 相比requirejs优点

1. **按需执行**：比如：if(false){ require('c') }，这样的写法虽然还是会就去加载c.js的文件，但是不会执行c模块里的define回调，从而提升代码执行性能；

2. **按需加载**：比如：if(false){ require.async('a') }，这样的写法就不去加载c.js的文件了；

### 缺点
1. **代码执行顺序不按书写顺序**：从文件a.js可以看出，require的模块执行顺序是在console.log('a call')之前，并不是按照书写的顺序那样；另外，像上面说到的，b、c可能因为文件大小或者网络原因，执行的顺序有可能不会像require的顺序一样。