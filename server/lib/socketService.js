
exports.setupSocketEvents = function(io, lobby, DEBUG) {
  //Socket io events
  io.on('connection', function (socket) {

    var roomUrls = [];

    socket.on('create room', function (data, callback) {
      if(DEBUG) {
        console.log("Create room");
      }
      var roomId = lobby.createRoom(socket);

      callback(roomId);
    });

    socket.on('join room', function(data, callback) {
      var joinSucceeded = lobby.joinRoom(data.roomUrl, socket);

      if(joinSucceeded){
        if(DEBUG) {
          console.log(socket.id + " has joined a room " + data.roomUrl);
        }

        io.in(data.roomUrl).clients(function(error, clients){
          if(DEBUG) {
            console.log(clients);
          }
        });

        roomUrls.push(data.roomUrl);

      }else{
        if(DEBUG) {
          console.log("Someone tried to join a room " + data.roomUrl + " that didnt exist");
        }
      }

      io.in(data.roomUrl).emit('vote connections update', {voteConnections: lobby.getVoteConnections(data.roomUrl)});

      callback({joinSucceeded: joinSucceeded, isAdmin: lobby.isAdminForRoom(data.roomUrl, socket)});
    });

    socket.on('leave room', function(data, callback) {

      var roomUrl = data.roomUrl;

      var result = lobby.leaveRoom(roomUrl, socket);

      if(result){
        if(DEBUG) {
          console.log(socket.id + " as left room " + roomUrl);
        }

        io.in(data.roomUrl).clients(function(error, clients){
          if(DEBUG) {
            console.log(clients);
          }
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
      var voteSuccess = lobby.vote(data.timeInHours, data.roomUrl, socket);
      if(DEBUG) {
        console.log(socket.id + " voted");
      }

      if(voteSuccess){
        io.in(data.roomUrl).emit('vote connections update', { voteConnections: lobby.getVoteConnections(data.roomUrl) });
      }
    });

    socket.on('reset votes', function(data) {
      var result = lobby.resetVotes(data.roomUrl);

      if(result) {
          console.log("User has reset votes in room " + data.roomUrl);

        io.in(data.roomUrl).emit('reset votes');
        io.in(data.roomUrl).emit('vote connections update', { voteConnections: lobby.getVoteConnections(data.roomUrl) });
      }
    });

    socket.on('reveal', function(data){
      lobby.revealVotes(data.roomUrl);
      io.in(data.roomUrl).emit('vote connections update', { voteConnections: lobby.getVoteConnections(data.roomUrl) });
    });


    socket.on('toggle voter', function(data, callback){
      var isVoter = lobby.toggleVoter(data.roomUrl, socket.id);

      callback(isVoter);
      io.in(data.roomUrl).emit('vote connections update', { voteConnections: lobby.getVoteConnections(data.roomUrl) });
    });

    socket.on('disconnect', function() {
      for(var i = 0; i < roomUrls.length; i++){
        lobby.leaveRoom(roomUrls[i], socket);
      }
    });
  });
}
