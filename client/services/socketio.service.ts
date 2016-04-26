import {Injectable} from 'angular2/core';

declare var io: any;

@Injectable()
export class SocketService {
  socket: any;

    constructor(){
      console.log("Constructed?");
        var socket = io('http://localhost:8000');
    }
}
