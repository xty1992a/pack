process.env.NODE_ENV = 'development';

const base = require('./webpack.base');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dftOptions = {
  context: process.cwd(),
  report: false,
  entry: {}
};

function fmtOptions(opt) {
  const options = {...dftOptions, ...opt};

  options.root = p => path.resolve(options.context, p);

  return options;
}

module.exports = (opt = {}) => new Promise((resolve, reject) => {
  const options = fmtOptions(opt);

  const config = {
	entry: options.entry,
	context: options.context,
	mode: 'development',
	devServer: {
	  contentBase: options.context,
	  compress: true,
	  quiet: true,
	  hot: true,
	  port: 8080,
	  host: 'localhost',
	  publicPath: '/',
	  disableHostCheck: true,
	},
	plugins: [
	  new webpack.HotModuleReplacementPlugin(),
	  new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'index.html',
		inject: true,
		hash: true,
	  }),
	],
  };

  resolve(merge(base(options), config));
});
