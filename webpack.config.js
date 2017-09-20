module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: "./src/app.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  }
}