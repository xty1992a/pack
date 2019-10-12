const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PRODUCTION = process.env.NODE_ENV === 'production';
const path = require('path');

const baseConfig = ({root, context}) => {
  return {
	entry: {},
	resolve: {
	  extensions: ['.js', '.ts', '.tsx'],
	  alias: {
		'@': path.resolve(context, 'src'),
	  },
	},
	output: {
	  path: root('dist'),
	  filename: PRODUCTION ? '[name]_[chunkhash:8].js' : '[name].js',
	  chunkFilename: PRODUCTION ? '[name]_[chunkhash:8].js' : '[name].js'
	},
	module: {
	  rules: [
		{
		  test: /\.js$/,
		  loader: 'babel-loader',
		  options: {
			"presets": [
			  [
				"@babel/preset-env",
				{
				  "modules": false,
				  "useBuiltIns": "usage",
				  "corejs": "2"
				}
			  ]
			],
			"plugins": [
			  "@babel/plugin-proposal-class-properties",
			  "@babel/plugin-transform-runtime"
			]
		  },
		  exclude: /node_modules/
		},
		{
		  test: /\.vue$/,
		  loader: 'vue-loader'
		},
		{
		  test: /\.css$/,
		  use: [
			'vue-style-loader',
			'css-loader',
			'postcss-loader',
		  ]
		},
		{
		  test: /\.less$/,
		  use: [
			'vue-style-loader',
			'css-loader',
			'postcss-loader',
			'less-loader'
		  ]
		},
	  ]
	},
	plugins: [
	  new VueLoaderPlugin()
	]
  };
};

module.exports = baseConfig;
