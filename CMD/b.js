console.log('b')

define(function () {
  console.log('b call')

  return {
    speak: function () {
      console.log('Hello World')
    }
  };
});