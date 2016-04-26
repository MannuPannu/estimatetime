var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(8000);

io.set("origins", "*:*");

app.get('/[^\.]+$', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use("/", express.static(__dirname + "/"));

io.on('connection', function (socket) {
  console.log("Connected");
	socket.emit('foo', 42);
});
