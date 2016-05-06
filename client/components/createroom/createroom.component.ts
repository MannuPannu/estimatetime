
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'createroom',
    templateUrl: 'client/components/createroom/createroom.html',
})
export class CreateRoomComponent {

    public showRoomDoesNotExistMessage: boolean;

    constructor(private _router: Router,
                private _socketService: SocketService){
                  this.showRoomDoesNotExistMessage = false;
                }

    createRoom() {
      var that = this;

      that._socketService.createRoom(function (roomUrl) {
        that._router.navigate(['/room', roomUrl])
      });
    }

    joinRoom(roomUrl) {
      this._socketService.roomExist(roomUrl).then(result => this.afterRoomExistCheck(result, roomUrl));
    }

    afterRoomExistCheck(roomExist, roomUrl){
      if(roomExist){
        this._router.navigate(['/room', roomUrl])
      }
      else{
        var that = this;
        that.showRoomDoesNotExistMessage = true;

        window.setTimeout(function() {
          that.showRoomDoesNotExistMessage = false;
        }, 2000);
      }
    }
 }
