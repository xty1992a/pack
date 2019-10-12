const {promisify} = require('util');
const glob = promisify(require('glob'));
const path = require('path');

module.exports = {
  fullPath: dir => path.resolve(process.cwd(), path.join('.', dir)),
  async getEntries(dir) {
	try {
	  const files = await glob(dir);
	  return files.map(it => ({name: it.match(/\/(\w+)\/index\.js$/)[1], value: path.resolve(process.cwd(), it)}));
	} catch (e) {
	  return [];
	}
  }
};


