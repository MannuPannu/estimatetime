var _ = require('underscore')._;
var util = require('util');

var User = function(socketId, voter) {

  var that = this;
  that.socketId = socketId;
  that.voteValue = -1;
  that.voted = false;

  that.voter = voter;

  return {
    vote: function(voteValue){
      that.voteValue = voteValue;
      that.voted = true;
    },
    resetVote: function(){
      that.voteValue = -1;
      that.voted = false;
    },
    setIsVoter: function(isVoter){
      that.voter = isVoter;
    },
    getSocketId: function(){
      return that.socketId;
    },
    getVoteValue: function(){
      return that.voteValue;
    },
    hasVoted: function() {
      return that.voted;
    },
    toggleVoter: function(){
      that.voter = !that.voter;
    },
    isVoter: function(){
      return that.voter;
    },
    getDataForClient: function(showVoteValue){
       return { socketId: that.socketId, voteValue: (showVoteValue ? that.voteValue : -1), voted: that.voted, voter: that.voter };
    }
  }
};

var Room = function(socket, roomUrl) {
  this.roomUrl = roomUrl;
  this.adminId = socket.id;
  this.voteConnections = []; //List of User, change to typescript later
  this.revealVotes = false;
};

function calcTime(offset) {
  // create Date object for current location
  d = new Date();

  // convert to msec
  // add local time zone offset
  // get UTC time in msec
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // create new Date object for different place
  // using supplied offset
  nd = new Date(utc + (3600000*offset));

  // return time as a string
  return nd.toLocaleString();
}

Room.prototype.isAdmin = function(socketId){
  return this.adminId === socketId;
}

exports.Room = Room;
exports.User = User;
