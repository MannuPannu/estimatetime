import {Injectable} from 'angular2/core';

declare var io: any;

@Injectable()
export class SocketService {
  socket: any;

    constructor(){
        this.socket = io();
    }

    createRoom(callBack: Function){
      this.socket.emit('create room', {}, callBack);
    }
}
