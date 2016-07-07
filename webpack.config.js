var glob = require('glob')
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: [
    './app/client.js'
  ].concat(glob.sync('./app/styles/*')),
  output: {
    path: "./server/static/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public",
    hot: true,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract("style-loader", ['css-loader', 'postcss-loader', 'sass-loader'])
      }
    ]
  },
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin("style.css", {
      allChunks: true
    })
  ]
};
