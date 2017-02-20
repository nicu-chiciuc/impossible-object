var path = require('path');

const config = {
  entry: ['babel-polyfill', './src/script.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dist.js'
  },
  module: {
    loaders: [{
      test: /.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      // include: [
      //   path.resolve(__dirname, 'src')
      // ],
      query: {
        presets: ['es2015']
      }
    }]
  },


  devServer: {inline: true},

};

module.exports = config;
