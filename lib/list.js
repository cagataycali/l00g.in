var async = require('async');
var inquirer = require('inquirer');
var fsjetpack = require('fs-jetpack');
var exist = require('3x1st');
var parser = require('./parser');
var colors = require('colors');
var clipboardy = require('clipboardy');

var questions = [
	{
		type: 'list',
		name: 'option',
		message: 'Which ssh config will be deleted?',
		choices: parser.hostnameList()
	}
];
module.exports = () => {
	return new Promise((resolve, reject) => {
		inquirer.prompt(questions).then((answers) => {
			clipboardy.writeSync(`ssh ${answers.option.trim()}`);
			resolve(colors.green(`Copied your clipboard. You can paste what ever you want :)`));
		});
	});
}
