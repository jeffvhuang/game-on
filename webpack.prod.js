const AntdScssThemePlugin = require('antd-scss-theme-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    // Similar to extract-text-webpack-plugin does, the CSS can be extracted in one CSS file
    // via mini-css-extract-plugin and using optimization.splitChunks.cacheGroups.
    // The node_modules are also extracted and bundled as 'vendors'
    splitChunks: {
      // maxSize: 249856,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        vendors: {
          name: 'vendors',
          // test: /[\\/]node_modules[\\/]/,
          test: 'vendors', // vendors is/would be one of the names given in 'output'
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin(),
    new AntdScssThemePlugin('./src/styles/theme.scss')
  ],
  output: {
    filename: '[name].[chunkhash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // specific test to ensure web.config file is kept as it is and placed in project root
          {
            test: /\.(config)$/,
            loader: require.resolve('file-loader'),
            options: {
              // name here specified it's location and name. (if 'static/[name].[ext], it will be in static folder)
              name: '[name].[ext]'
            }
          },
          // "url" loader works just like "file" loader but it also embeds
          // assets smaller than specified size as data URLs to avoid requests.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(tsx|jsx|mjs)$/,
            exclude: /node_modules/,
            use: { loader: 'awesome-typescript-loader' },
          },
          {
            test: /\.scss$/,
            use: [
              // fallback to style-loader in development
              process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
              "css-loader",
              AntdScssThemePlugin.themify("sass-loader")
            ]
          },
          {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              AntdScssThemePlugin.themify({
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true
                }
              })
            ]
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          // "file" loader makes sure assets end up in the `build` folder.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, '/web.config'],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          } // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  }
});