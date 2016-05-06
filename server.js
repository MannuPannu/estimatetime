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
  socket.on('create room', function (data, callback) {
    var roomId = lobby.createRoom();

    console.log(lobby.rooms);
    callback(roomId);
  });

  socket.on('join room', function(data, callback) {
    var result = lobby.joinRoom(data.roomUrl, socket);

    if(result){
      console.log(socket.id + " has joined a room");
      io.in(data.roomUrl).clients(function(error, clients){
        console.log(clients);
      });
    }else{
      console.log("Someone tried to join a room that didnt exist");
    }

    callback(result);
  });

  socket.on('leave room', function(data, callback) {

    var roomUrl = data.roomUrl;

    var result = lobby.leaveRoom(roomUrl, socket);

    if(result){
      console.log(socket.id + " as left room " + roomUrl);
      io.in(data.roomUrl).clients(function(error, clients){
        console.log(clients);
      });
    }

    callback(result);
  });
});
