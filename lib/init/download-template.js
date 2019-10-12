const shell = require('shelljs');
const path = require('path');

module.exports = function (target, templateName) {
  target = path.join(target || '.', '.download-temp');
  console.log(templateName);

  return new Promise(resolve => {
	shell.mkdir('.download-temp');
	shell.cd('.download-temp');
	shell.exec('git init');
	shell.exec('git remote add -f origin https://github.com/xty1992a/template.git');
	shell.exec('git config core.sparsecheckout true');
	shell.exec(`echo ${templateName} >> .git/info/sparse-checkout`);
	shell.exec('git pull origin master');
	shell.cd(templateName);
	shell.ls('.').concat('.gitignore').forEach(name => {
	  console.log(name);
	  shell.cp('-R', name, '../..');
	});
	shell.cd('../..');
	shell.rm('-rf', '.download-temp');
	resolve({success: true});
  });
};
