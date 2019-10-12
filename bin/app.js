#!/usr/bin/env node
const program = require('commander');

program.version('1.0.0')
	.usage('<command> [项目名称]')
	.command('init', '创建新项目')
	.command('dev', '开启开发服务器')
	.parse(process.argv);
