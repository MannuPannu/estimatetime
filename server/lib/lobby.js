var _ = require('underscore')._;
var RoomClass = require('./room.js');

var Lobby = function(io) {
  this.io = io;
  this.rooms = {};
};

Lobby.prototype.createRoom = function(roomUrl) {
  roomUrl = roomUrl === undefined ? this.createUniqueURL() : roomUrl + this.createUniqueURL();

  if (this.rooms[roomUrl]) {
    this.createRoom(roomUrl);
  }

  // remove any existing empty rooms first
  // var thatRooms = this.rooms;
  // _.each(this.rooms, function(room, key, rooms) {
  //   if (room.getClientCount() === 0) {
  //     delete thatRooms[key];
  //   }
  // });

  this.rooms[roomUrl] = new RoomClass.Room(this.io, roomUrl);

  return roomUrl;
};

Lobby.prototype.createUniqueURL = function() {
  var text = "", possible = "0123456789", i;

  for ( i = 0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

exports.Lobby = Lobby;
