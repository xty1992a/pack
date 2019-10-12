const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = config => new Promise(async (resolve, reject) => {
  portfinder.basePort = config.devServer.port;
  portfinder.getPort((err, port) => {
	if (err) return reject(err);
	config.devServer.port = port;
	config.plugins.push(new FriendlyErrorsPlugin({
	  compilationSuccessInfo: {
		messages: [`Your application is running here: http://${config.devServer.host}:${port}`],
	  },
	}));
	const compiler = webpack(config);

	const devServerOptions = Object.assign({}, config.devServer, {
	  open: true,
	  stats: {
		colors: true,
	  },
	});
	const server = new webpackDevServer(compiler, devServerOptions);

	server.listen(port, '127.0.0.1', () => {
	  console.log(`Starting server on http://${config.devServer.host}:${port}`);
	});

	resolve(server);
  });

});
