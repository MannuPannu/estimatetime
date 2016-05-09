import {Injectable} from '@angular/core';

declare var io: any;

@Injectable()
export class SocketService {
  socket: any;

    connectToSocket(){
        this.socket = io();
    }

    createRoom(callBack: Function){
      this.socket.emit('create room', {}, callBack);
    }

    joinRoom(roomUrl: string) {
      return new Promise<boolean>(resolve =>
        this.socket.emit('join room', { roomUrl: roomUrl}, function(result) {
          resolve(result);
        }));
    }

    leaveRoom(roomUrl: string) {
      return new Promise<boolean>(resolve =>
        this.socket.emit('leave room', { roomUrl: roomUrl}, function(result) {
          resolve(result);
        }));
    }

    roomExist(roomUrl: string){
      return new Promise<boolean>(resolve =>
        this.socket.emit('room exist', { roomUrl: roomUrl}, function(result) {
          resolve(result);
        }));
    }

    onVoteUpdate(callback: Function) {
      this.socket.on('vote connections update', function(data) {
        callback(data.voteConnections);
      });
    }

    vote(timeInHours: string, roomUrl: string) {
        this.socket.emit('vote', { timeInHours: timeInHours, roomUrl: roomUrl});
    }
}
