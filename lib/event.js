// var events = require('events');
// var eventEmitter = new events.EventEmitter();
//
// eventEmitter.on('doorOpen', function(ring) {
//     console.log(ring);
// });
//
// eventEmitter.emit('doorOpen', 'ringelin');


var EventEmitter = require('events').EventEmitter;

module.exports = new EventEmitter();

module.exports.on('event', function(ring) {
    console.log(ring);
});

module.exports.emit('event', 'value');
