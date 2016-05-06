var _ = require('underscore')._;
var RoomClass = require('./room.js');

var Lobby = function(io) {
  this.io = io;
  this.rooms = {};
};

Lobby.prototype.createRoom = function(socket) {

  //Create unique room id
  var roomUrl = this.createUniqueURL();

  while(this.rooms[roomUrl]) { //Try until we have a unique room id
    roomUrl = this.createUniqueURL();
  }

  //Create room
  this.rooms[roomUrl] = new RoomClass.Room(socket, roomUrl);

  return roomUrl;
}

Lobby.prototype.joinRoom = function(roomUrl, socket) {

  var room = this.rooms[roomUrl];

  if(room){
    socket.join(roomUrl);
    return true;
  }
  else {
    return false;
  }
}

Lobby.prototype.leaveRoom = function(roomUrl, socket) {

  var room = this.rooms[roomUrl];

  if(room){
    socket.leave(roomUrl);
    return true;
  }
  else {
    return false;
  }
}

Lobby.prototype.roomExist = function(roomUrl){
  if(this.rooms[roomUrl]){
    return true;
  }
  else {
    return false;
  }
}

Lobby.prototype.isAdminForRoom = function(roomUrl, socket){

  var room = this.rooms[roomUrl];

  if(room){
    return room.isAdmin(socket.id);
  }
  else {
    return false;
  }
}

Lobby.prototype.createUniqueURL = function() {
  var text = "", possible = "0123456789", i;

  for ( i = 0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

exports.Lobby = Lobby;
