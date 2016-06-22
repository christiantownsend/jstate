module.exports = {
  entry: "./app/client.js",
  output: {
    path: "./public/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public",
    hot: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  }
};
