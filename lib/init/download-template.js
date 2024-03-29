const shell = require("shelljs");
const path = require("path");

module.exports = function (target, templateName) {

  const ignore = [".babelrc", ".postcssrc.js", ".gitignore"];

  return new Promise(resolve => {
    if (target !== ".") {
      shell.mkdir(target);
      shell.cd(target);
    }
    // 临时git目录
    shell.mkdir(".download-temp");
    shell.cd(".download-temp");
    shell.exec("git init");
    shell.exec("git remote add -f origin https://github.com/xty1992a/template.git");
    // 设置只拉取指定目录
    shell.exec("git config core.sparsecheckout true");
    shell.exec(`echo ${templateName} >> .git/info/sparse-checkout`);
    shell.exec("git pull origin master");
    shell.cd(templateName);
    shell.ls("-A").forEach(name => {
      shell.cp("-R", name, "../..");
    });
    shell.cd("../..");
    shell.rm("-rf", ".download-temp");
    resolve({success: true});
  });
};
