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
  console.log("Connected");

  socket.on('create room', function (data, callback) {
    var roomId = lobby.createRoom();
    callback(roomId);
  });

  socket.on('join room', function(data, callback) {
    var result = lobby.joinRoom(data.roomUrl, socket);

    callback(result);
  });
});
