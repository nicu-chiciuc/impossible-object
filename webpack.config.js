var path = require("path");

const config = {
  entry: ["babel-polyfill", "./src/script.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "dist.js"
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        // include: [
        //   path.resolve(__dirname, 'src')
        // ],
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.(html|jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
    ]
  },

  devServer: { inline: true }
};

module.exports = config;
