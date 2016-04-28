var _ = require('underscore')._;
var util = require('util');

var Room = function(io, roomUrl) {
  this.io = io;
  this.roomUrl = roomUrl;
  this.createdAt = calcTime(2);
  this.createAdmin = true;
  this.hasAdmin = false;
  this.connections = {}; // we collect the votes in here
  this.forcedReveal = false;
};

Room.prototype.getClientCount = function() {
  return _.filter(this.connections, function(c) { return c.socketId }).length;
}

function calcTime(offset) {
  // create Date object for current location
  d = new Date();

  // convert to msec
  // add local time zone offset
  // get UTC time in msec
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // create new Date object for different place
  // using supplied offset
  nd = new Date(utc + (3600000*offset));

  // return time as a string
  return nd.toLocaleString();
}

Room.prototype.joinRoom = function(socket) {
  

}

exports.Room = Room;
