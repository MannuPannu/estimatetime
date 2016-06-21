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
    room.voteConnections.push(new RoomClass.User(socket.id, true));

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
                              return e.getSocketId() !== socket.id;
                            });

    return true;
  }
  else {
    return false;
  }
}

Lobby.prototype.vote = function(timeInHours, roomUrl, socket){

  var room = this.rooms[roomUrl];

  var voteResult = false;

  if(room && !room.revealVotes){
    for(var i = 0; i < room.voteConnections.length; i++){
      var user = room.voteConnections[i];

      if(user.getSocketId() === socket.id){
        user.vote(timeInHours);

        voteResult = true;
        break;
      }
    }

    if(_.every(room.voteConnections, function(e) { return e.hasVoted() === true; }))
    {
      console.log("Everyone has voted, reveal room");
      this.revealVotes(roomUrl);
    }
  }

  return voteResult;
}

Lobby.prototype.revealVotes = function(roomUrl){

    var room = this.rooms[roomUrl];

    if(room){
      room.revealVotes = true;
    }
}

Lobby.prototype.resetVotes = function(roomUrl){
    var room = this.rooms[roomUrl];

    if(room){
      room.voteConnections.forEach(function(vc) { vc.resetVote()});

      // for(var i = 0; i < room.voteConnections.length; i++){
      //   room.voteConnections[i].voted = false;
      //   room.voteConnections[i].voteValue = -1;
      // }

      room.revealVotes = false;

      return true;
    }

    return false;
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

//Todo: Rewrite this to send back voteconnections to server
Lobby.prototype.getVoteConnections = function(roomUrl) {
  var room = this.rooms[roomUrl];

  if(room) {
    if(room.revealVotes){
      console.log(room.voteConnections);
      return _.map(room.voteConnections, function(v) { return { socketId: v.getSocketId(), voteValue: v.getVoteValue(), voted: v.hasVoted() }; });
    }
    else{ //Remove vote time info
      var voteConnectionsWithRemovedVotes = _.map(room.voteConnections, function(v) { return { socketId: v.getSocketId(), voteValue: -1, voted: v.hasVoted() }; });
      console.log(voteConnectionsWithRemovedVotes);
      return voteConnectionsWithRemovedVotes;
    }
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
