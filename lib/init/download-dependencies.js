const shell = require('shelljs');

module.exports = function () {
  return new Promise(resolve => {
	// shell.echo(shell.ls());
	shell.exec('yarn');
	resolve({success: true});
  });
};
