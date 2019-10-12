#!/usr/bin/env node
const program = require('commander');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const downloadTmp = require('../lib/init/download-template');
const downloadDep = require('../lib/init/download-dependencies');
const {fullPath} = require('../lib/utils');

program.usage('<project-name>').parse(process.argv);

// 根据输入，获取项目名称
const projectName = program.args[0];
const templateName = program.args[1] || 'multi-entry-vue';

if (!projectName) {  // project-name 必填
  // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
  program.help();
  return;
}

const list = glob.sync('*');  // 遍历当前目录
let rootName = path.basename(process.cwd());

if (list.length) {  // 如果当前目录不为空
  if (list.filter(name => {
	const fileName = fullPath(name);
	const isDir = fs.statSync(fileName).isDirectory();
	return name.indexOf(projectName) !== -1 && isDir;
  }).length !== 0) {
	console.log(`项目${projectName}已经存在`);
	return;
  }
  rootName = projectName;
}
else if (rootName === projectName) {
  rootName = '.';
}
else {
  rootName = projectName;
}

go();

async function go() {
  const tmp = await downloadTmp(rootName, templateName);
  if (!tmp.success) return;
  const dep = await downloadDep();
  console.log(dep);
}
