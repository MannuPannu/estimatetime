var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

var DEBUG = false;

var server = http.createServer(app);
var io = require('socket.io').listen(server);

var socketService = require('./server/lib/socketService.js');

var lobbyClass = require('./server/lib/lobby.js');
var lobby = new lobbyClass.Lobby(io);

var portNumber = 8000;

server.listen(portNumber);

console.log("Server listening on port " + portNumber);

io.set("origins", "*:*");

app.get('/[^\.]+$', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use("/", express.static(__dirname + "/"));

socketService.setupSocketEvents(io, lobby, DEBUG);
