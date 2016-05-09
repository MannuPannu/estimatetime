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
    room.voteConnections.push({socketId: socket.id, voteValue: -1, voted: false })

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
    room.voteConnections = room.voteConnections.filter(function(e){
                              return e.socketId !== socket.id;
                            });

    return true;
  }
  else {
    return false;
  }
}

Lobby.prototype.vote = function(timeInHours, roomUrl, socket){

  var room = this.rooms[roomUrl];

  if(room){
    for(var i = 0; i < room.voteConnections.length; i++){
      var voteConnection = room.voteConnections[i];

      if(voteConnection.socketId === socket.id){
        voteConnection.voteValue = timeInHours;
        voteConnection.voted = true;

        break;
      }
    }
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

Lobby.prototype.getVoteConnections = function(roomUrl) {
  var room = this.rooms[roomUrl];

  if(room) {
    return room.voteConnections;
  }
  else {
    return -1;
  }
}

Lobby.prototype.getUserCountForRoom = function(roomUrl){
  var room = this.rooms[roomUrl];

  if(room) {
    return room.userCount;
  }
  else {
    return 0;
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
