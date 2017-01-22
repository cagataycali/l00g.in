var async = require('async');
var inquirer = require('inquirer');
var fsjetpack = require('fs-jetpack');
var exist = require('3x1st');
var parser = require('./parser');
var colors = require('colors');
var cl0n3 = require('cl0n3');
var C = require('cr34t3');
var E = require('3x3c');
var isGitUrl = require('is-git-url');
var configDir = process.env['HOME'] + '/.ssh/config';

var questions = [
	{
		type: 'list',
		name: 'option',
		message: 'Which solution is fit for you?',
		choices: ['Clone my config', 'Create new repository for me', "Sync me dude, I have already init my config at git."]
	}
];
module.exports = () => {
	return new Promise((resolve, reject) => {
		inquirer.prompt(questions).then((answers) => {
			if (answers.option === 'Clone my config') {

        console.log(colors.gray(`Your awesome ssh config backed up.`));

        var questions = [
          {
            type: 'input',
            name: 'url',
            message: 'What\'s your git repository url?',
            validate: (value) => {
							isGitUrl(value) ? return true : return 'Please enter a git url.';
            }
          }
        ];
        inquirer.prompt(questions).then((answers) => {
        var obj = {
          url: answers.url,
          name: `${process.env['HOME']}/.ssh.l00g.in/`,
        };

        cl0n3.programmatic(obj)
          .then((value) => {
            E(`mv ${process.env['HOME']}/.ssh/ ${process.env['HOME']}/.ssh-origin/ && mv ${process.env['HOME']}/.ssh.l00g.in/ ${process.env['HOME']}/.ssh/ && chmod 400 ${process.env['HOME']}/.ssh/id_rsa`)
              .then(() => {
                resolve(value);
              })
              .catch((err) => {
                reject(color.red(err));
              })
          })
          .catch((err) => {reject(err);})
        });



      } else if (answers.option === 'Create new repository for me') {
        C()
          .then((value) => {
            var questions = [
              {
                type: 'list',
                name: 'url',
                message: 'What\'s your prefer for repository url?',
                choices: ['https', 'ssh']
              }
            ];
            inquirer.prompt(questions).then( (answers) => {
              if (answers.url === 'https') {
                E(`cd ${process.env['HOME']}/.ssh/; git init; git remote add origin ${value.clone_url}`)
                  .then((value) => {
                    console.log(colors.grey('Initialized your github repository.'));
                    E(`cd ${process.env['HOME']}/.ssh/; git add . && git commit -m "Init :zap: :tada:" && git push -u origin master`)
                      .then((value) => {
                        resolve(colors.green('Your ssh config backed up successfully.'))
                      })
                      .catch((err) => {colors.red(err)});
                  })
                  .catch((err) => {colors.red(err)});
              } else {
                E(`cd ${process.env['HOME']}/.ssh/; git init; git remote add origin ${value.ssh_url}`)
                  .then((value) => {
                    console.log(colors.grey('Initialized your github repository.'));
                    E(`cd ${process.env['HOME']}/.ssh/; git add . && git commit -m "Init :zap: :tada:" && git push -u origin master`)
                      .then((value) => {
                        resolve(colors.green('Your ssh config backed up successfully.'))
                      })
                      .catch((err) => {colors.red(err)});
                  })
                  .catch((err) => {colors.red(err)});
              }
            });
          })
          .catch((err) => {console.log(err);})

      } else {
				E(`cd ${process.env['HOME']}/.ssh/;git pull origin master && git add . && git commit -m 'Sync :zap:' && git push origin master`)
					.then((value) => {
						resolve(colors.green('Your ssh config backed up successfully.'))
					})
					.catch((err) => {colors.red(err)});
			}
		});
	});
}
