var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

var server = http.createServer(app);
var io = require('socket.io').listen(server);

var lobbyClass = require('./server/lib/lobby.js');
var lobby = new lobbyClass.Lobby(io);

server.listen(8000);

io.set("origins", "*:*");

app.get('/[^\.]+$', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use("/", express.static(__dirname + "/"));

//Socket io events
io.on('connection', function (socket) {

  var roomUrls = [];

  socket.on('create room', function (data, callback) {
    var roomId = lobby.createRoom(socket);

    callback(roomId);
  });

  socket.on('join room', function(data, callback) {
    var joinSucceeded = lobby.joinRoom(data.roomUrl, socket);

    if(joinSucceeded){
      console.log(socket.id + " has joined a room " + data.roomUrl);
      io.in(data.roomUrl).clients(function(error, clients){
        console.log(clients);
      });

      roomUrls.push(data.roomUrl);
    }else{
      console.log("Someone tried to join a room " + data.roomUrl + " that didnt exist");
    }

    io.in(data.roomUrl).emit('vote connections update', {voteConnections: lobby.getVoteConnections(data.roomUrl)});

    callback({joinSucceeded: joinSucceeded, isAdmin: lobby.isAdminForRoom(data.roomUrl, socket)});
  });

  socket.on('leave room', function(data, callback) {

    var roomUrl = data.roomUrl;

    var result = lobby.leaveRoom(roomUrl, socket);

    if(result){
      console.log(socket.id + " as left room " + roomUrl);
      io.in(data.roomUrl).clients(function(error, clients){
        console.log(clients);
      });

      roomUrls = roomUrls.filter(function(roomUrl) { return roomUrl !== data.roomUrl;  });
    }

    io.in(data.roomUrl).emit('vote connections update', {voteConnections: lobby.getVoteConnections(data.roomUrl)});

    callback(result);
  });

  socket.on('room exist', function(data, callback) {
    var result = lobby.roomExist(data.roomUrl);
    callback(result);
  });

  socket.on('vote', function(data) {
    lobby.vote(data.timeInHours, data.roomUrl, socket);
    console.log(socket.id + " voted");
    io.in(data.roomUrl).emit('vote connections update', { voteConnections: lobby.getVoteConnections(data.roomUrl) });
  });

  socket.on('reveal', function(data){
    lobby.revealVotes(data.roomUrl);
    io.in(data.roomUrl).emit('reveal', {voteConnections: lobby.getVoteConnections(data.roomUrl)});
  });

  socket.on('disconnect', function() {
    for(var i = 0; i < roomUrls.length; i++){
      lobby.leaveRoom(roomUrls[i], socket);
    }
  });
});
