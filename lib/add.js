var async = require('async');
var inquirer = require('inquirer');
var fsjetpack = require('fs-jetpack');
var exist = require('3x1st');
var parser = require('./parser');
var colors = require('colors');

function trimMe(value) {
	value = value.trim();
	var res;
	value.length > 0 ? res = true : res = 'Please enter a name';
	return res;
}

var questions = [{
	type: 'input',
	name: 'name',
	message: 'Enter your ssh config name',
	default: 'my-cool-server',
	validate: (value) => {return trimMe(value)}
},
{
	type: 'input',
	name: 'HostName',
	message: 'Enter the dns or ip of your server',
	validate: (value) => {return trimMe(value)}
},
{
	type: 'input',
	name: 'User',
	message: 'Enter your username',
	default: 'root',
	validate: (value) => {return trimMe(value)}
},
{
	type: 'input',
	name: 'IdentityFile',
	message: 'Enter the location of your identity file (or leave blank)'
},
{
	type: 'list',
	name: 'PasswordAuthentication',
	message: 'Use password for login?',
	choices: ['no', 'yes'],
},
{
	type: 'input',
	name: 'Port',
	message: 'Enter your port if needed',
	default: 22,
	validate: (value) => {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
  filter: Number
}];
module.exports = () => {
	return new Promise((resolve, reject) => {
		inquirer.prompt(questions).then((answers) => {

			// Check IdentityFile
			if (answers.IdentityFile) {
				exist(answers.IdentityFile.trim())
		      .catch((err) => {
						reject("IdentityFile doesn\'t exist.")
					});
			}
			// Check hostname
			parser.find(answers.name)
			  .then((output) => {
					reject(colors.red('Rejected, hostname exist.'))
			  })
				.catch((err) => {
					var name = answers.name.trim();
					if (name.length !== 0) {
						delete answers['name'];
						var cleanString = 'Host ' + name + '\n';
						for (var i in answers) {
							if(answers[i] !== '') {
								cleanString += '  ' + i + ' ' + answers[i] + '\n';
							}
						};
						var filelocation = process.env['HOME'] + '/.ssh/config';
						fsjetpack.append(filelocation, cleanString);
						resolve(colors.green(`Congrats! You can now access your server by typing ssh ${name}`));
					} else {
						reject(colors.red('Rejected, name is null.'));
					}
				});
		});
	});
}
