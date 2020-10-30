seajs.config({
  base: '/CMD',
  // alias: {
  //     app: '../app'
  // }
});

console.log('index')

// 加载入口模块
seajs.use(['a'], function(a) {
  console.log('index call')

  a.speak()
});