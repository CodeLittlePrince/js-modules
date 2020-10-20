requirejs.config({
  baseUrl: '/AMD',
  // paths: {
  //     app: '../app'
  // }
});

console.log('index')

requirejs(['a'], function(a) {
  console.log('index call')

  a.speak()
});