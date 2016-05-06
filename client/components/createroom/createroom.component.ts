
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socketio.service';

@Component({
    selector: 'createroom',
    templateUrl: 'client/components/createroom/createroom.html',
})
export class CreateRoomComponent {

    public showRoomExistMessage: boolean;

    constructor(private _router: Router,
                private _socketService: SocketService){
                  this.showRoomExistMessage = false;
                }

    createRoom() {
      var router = this._router;

      this._socketService.createRoom(function (roomUrl) {
        let link = ['/room',  roomUrl ];
        router.navigate(link);
      });
    }

    joinRoom(roomUrl) {
      this._socketService.joinRoom(roomUrl).then(result => this.showRoomExistMessage = !result);
    }
 }
