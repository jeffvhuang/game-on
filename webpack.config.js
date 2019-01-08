const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    // NB: The entry points will help optimization.splitChunks decide how to chunk the bundles
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      inject: true
    })
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      }
    ]
  }
};