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