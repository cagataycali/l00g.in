var async = require('async');
var inquirer = require('inquirer');
var fsjetpack = require('fs-jetpack');
var exist = require('3x1st');
var parser = require('./parser');
var colors = require('colors');

var questions = [
	{
		type: 'list',
		name: 'option',
		message: 'Which ssh config will be deleted?',
		choices: parser.hostnameList()
	}
];
module.exports = function () {
	return new Promise((resolve, reject) => {
		inquirer.prompt(questions).then(function (answers) {
			parser.remove(answers.option)
				.then((value) => {
					resolve(value)
				})
		});
	});
}
