
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
        that.joinRoom(roomUrl);
      });
    }

    joinRoom(roomUrl) {
      this._socketService.joinRoom(roomUrl).then(result => this.afterJoin(result, roomUrl));
    }

    afterJoin(joinSucceeded, roomUrl){
      if(joinSucceeded){
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
