var path = require('path')

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: './index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      }
    ],
  },
  output: {
    path: path.join(__dirname, 'server/static'),
    filename: 'bundle.js'
  }
}
