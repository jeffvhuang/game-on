const AntdScssThemePlugin = require('antd-scss-theme-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/styles/ant-theme-vars.less'), 'utf8'));

module.exports = merge(common, {
  mode: 'development',
  // devtool specifies how info is shown in CLI
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new AntdScssThemePlugin('./theme.scss')
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        // "oneOf" will use only the first matching rule
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true
            },
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          {
            test: /\.css$$/,
            use: [
              'style-loader', // creates style nodes from JS strings
              'css-loader',
              'postcss-loader'
            ]
          },
          {
            test: /\.less$$/,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              {
                loader: 'less-loader',
                // loader: AntdScssThemePlugin.themify('less-loader'),
                options: {
                  javascriptEnabled: true,
                  modifyVars: themeVariables
                }
              }
            ]
          },
          {
            test: /\.scss$/,
            use: [
              "style-loader", // creates style nodes from JS strings
              "css-loader", // translates CSS into CommonJS
              "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
          },
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.less$/],
            loader: require.resolve('file-loader'),
            // options: {
            //   name: 'static/media/[name].[hash:8].[ext]',
            // },
          },
        ],
      },
      // **STOP** Make sure to add the new loader(s) before the "file" loader.
    ]
  }
});
