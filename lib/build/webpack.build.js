process.env.NODE_ENV = 'production';

const base = require('./webpack.base');
const webpack = require('webpack');
const merge = require('webpack-merge');
const root = p => path.join(__dirname, '..', p);

const dftOptions = {};

module.exports = (opt = {}) => new Promise((resolve, reject) => {
  // const options = {...dftOptions, ...opt};
  console.log(opt);

  const config = {
	mode: 'production',
	optimization: {
	  minimize: true
	},
  };

  resolve(merge(base, config));
});
