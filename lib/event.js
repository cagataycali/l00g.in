var EventEmitter = require('events').EventEmitter;

module.exports = new EventEmitter();

module.exports.on('event', function(ring) {
    console.log(ring);
});

module.exports.emit('event', 'value');
