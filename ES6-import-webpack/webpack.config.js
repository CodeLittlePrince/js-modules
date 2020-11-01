const path = require('path');

module.exports = {
  mode: "production", // "production" | "development" | "none"
  entry: "./index.js", // string | object | array
  output: {
    library: { // There is also an old syntax for this available (click to show)
      type: "umd", // universal module definition
    },
  },
}