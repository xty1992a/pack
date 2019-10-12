#!/usr/bin/env node
const program = require('commander');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');

const {getEntries} = require('../lib/utils');
const devConfig = require('../lib/build/webpack.dev');
const devServer = require('../lib/build/dev-server');
const context = process.cwd();

!async function () {
  try {
	program.usage('<project-name>').parse(process.argv);
	const modules = await getEntries('./src/pages/**/index.js');
	const {entries, report} = await inquirer.prompt([
	  {
		type: 'checkbox',
		name: 'entries',
		message: '请选择你要编译的页面',
		choices: modules.map(({name}) => ({name, value: name}))
	  },
	  {
		type: 'list',
		name: 'report',
		message: '你是否需要查看依赖视图?',
		choices: [
		  {
			name: '是',
			value: true
		  },
		  {
			name: '否',
			value: false
		  }
		]
	  }
	]);

	const entry = entries
		.map(key => modules.find(it => it.name === key))
		.reduce((pre, item) => ({...pre, [item.name]: item.value}), {});

	const config = await devConfig({entry, report});

	console.log(config);
	const server = await devServer(config);

  } catch (e) {
	console.log('pack dev failed ! ', e);
  }
}();
// './src/modules/*.js'
