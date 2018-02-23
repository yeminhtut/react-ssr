const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  // Tell webpack the root file of our
  // server application
  entry: './src/client/client.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
      rules: [
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
              use: [{
                  loader: 'css-loader',
                  options: {
                      minimize: true || {/* CSSNano Options */}
                  }
              }, {
                  loader: 'sass-loader',
              }]
          }),
      },
      {
          test: /\.png$/,
          loader: "file-loader"
      },
      {
              test: /\.(png|woff|woff2|eot|ttf|svg)$/,
              loader: 'url-loader?limit=100000'
      }
      ]
  },
  plugins: [
      new ExtractTextPlugin('style.css'),
  ]
};

module.exports = merge(baseConfig, config);
