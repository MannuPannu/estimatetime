import {Injectable} from 'angular2/core';

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

    joinRoom(roomUrl: string, callBack: Function) {
      this.socket.emit('join room', { roomUrl: roomUrl}, callBack);
    }
}
