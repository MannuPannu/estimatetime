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
}
