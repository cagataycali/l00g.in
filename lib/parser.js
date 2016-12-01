var async = require('async');
var fs = require('fs');
var parser = require('ssh-config-parser');
var configDir = process.env['HOME'] + '/.ssh/config';
var config = fs.readFileSync(configDir, 'utf8');
var colors = require('colors');
var E = require('3x3c');

module.exports.hostnameList = () => {
  var res = [];
  parsed.forEach((value, key) => {
    res.push(parsed[key].Host)
  })
  return res;
}

var parsed = parser(config);
module.exports.parse = () => {
  return new Promise(function(resolve, reject) {
    resolve(parsed);
  });
}

module.exports.remove = (hostname) => {
  return new Promise(function(resolve, reject) {

    parsed.forEach((value, key) => {
      if (parsed[key].Host === hostname) {
        parsed.splice(key, 1)
      }
    })

    module.exports.stringifyMe(parsed)
      .then((value) => {
        // This is my problem solving method dude.
        // Bash script is simple, simple is the best.
        E(`echo "${value}" > ${configDir}`)
          .then(() => {
            resolve(colors.green('Successfully removed host', hostname));
          })
          .catch((err) => {
            reject(colors.red(err));
          })
      })
      .catch((err) => {
        reject(colors.red(err));
      })
  });
}

module.exports.find = (hostname) => {
  return new Promise((resolve, reject) => {
    var isExist = false; // False

    parsed.forEach((value, key) => {
      if (value.Host === hostname) {
        isExist = true;
      }
    });
    isExist ? resolve() : reject();
  });
}

module.exports.stringify = () => {
  return new Promise((resolve, reject) => {
    module.exports.parse()
      .then((config) => {
        var configFile = "";
        config.forEach((aliases, key) => {

          Object.keys(aliases).forEach((key) => {
            var value = eval(`aliases.${key}`);
            if (key === 'Host') {
              configFile += `Host ${value}\n`;
            } else {
              configFile += `  ${key} ${value}\n`;
            }
          })

        })
        resolve(configFile);
      })
  });
}

module.exports.stringifyMe = (parsedObject) => {
  return new Promise((resolve, reject) => {

      var configFile = "";
      parsedObject.forEach((aliases, key) => {

        Object.keys(aliases).forEach((key) => {
          var value = eval(`aliases.${key}`);
          if (key === 'Host') {
            configFile += `Host ${value}\n`;
          } else {
            configFile += `  ${key} ${value}\n`;
          }
        })

      })
        resolve(configFile);

  });
}
