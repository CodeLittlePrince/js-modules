AMD
---
### 定义
[amdjs api](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)

### 用法
1.html引入`requirejs`和`主js`:
```html
<script src="/require.js"></script>
<script src="/index.js"></script>
```

主js：
```js
// index.js
console.log('index')

// 加载入口模块
requirejs(['a'], function(a) {
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
b call
c
c call
a call
index call
Hello World
```

### 过程
1. script标签加载require.js。
2. script标签加载index.js。
3. index.js中通过requirejs函数定义该文件为入口文件。所有子模块(a、b、c)加载方式其实是在`<head>`里append对应的js，并且带async属性。

4. js按照
index.js=>a.js=>b.js
              =>c.js
这样的顺序加载执行。所以，自然的先打印出index、a。又因为，b和c都是a所依赖的模块，所以b、c同时异步加载，谁加载完即先执行谁，因为两文件大小几乎一样，并且本地测试网络延迟可以忽略原因，先require谁就会先执行谁，并且，因为b、c都是最后一项被依赖的模块，所以回调就会被调用，因此打印出b、b call、c、c call。

5. a中的依赖逻辑处理完之后，才轮到a除了require之外的逻辑处理，所以继续打印出a call。
（因为它的实现可以看define的实现，其实是将define回调里的函数变为字符串,然后通过正则`cjsRequireRegExp`获取到所有的模块名，加入依赖队列；接着，去请求js资源执行，同样，如果被依赖的js文件还有依赖模块，则加入依赖队列，没有则执行define里的回调函数；另外顺便说下，回调的返回值会被defined对象收集，实现可见localRequire实现，所以，如b=require('b')得到的值即是b.js的define回调的返回值）

6. index中的依赖逻辑处理完之后，才轮到index除了require之外的逻辑处理，所以继续打印出index call。

### 优点
1. **提升页面响应速度**：js文件异步加载；

2. **模块化成本低**：只需要引入require.js就可以实现模块化；

### 缺点
1. **代码执行顺序不按书写顺序**：从文件a.js可以看出，require的模块执行顺序是在console.log('a call')之前，并不是按照书写的顺序那样；

2. **无法按需加载**：比如：if(false){ require('a') }，这样的写法并不会就不去加载a.js的文件了，照样会加载；另外，像上面说到的，b、c可能因为文件大小或者网络原因，执行的顺序有可能不会像require的顺序一样。