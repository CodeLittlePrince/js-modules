requirejs.config({
  baseUrl: '/AMD',
  // paths: {
  //     app: '../app'
  // }
});

console.log('index')

// 加载入口模块
requirejs(['a'], function(a) {
  console.log('index call')

  a.speak()
});