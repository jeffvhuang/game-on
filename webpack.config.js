const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    // NB: The entry points will help optimization.splitChunks decide how to chunk the bundles
    app: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      inject: true
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", '.js', '.jsx', '.less']
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      }
    ]
  }
};