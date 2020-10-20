// requirejs.config({
//   baseUrl: 'lib',
//   paths: {
//       app: '../app'
//   }
// });

requirejs(['a'], function(a) {
  console.log('index')
  a.speak()
});