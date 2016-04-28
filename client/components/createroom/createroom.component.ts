
import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import { SocketService } from '../../services/socketio.service';

@Component({
    selector: 'createroom',
    templateUrl: 'client/components/createroom/createroom.html',
    providers: [SocketService]
})
export class CreateRoomComponent {

    showRoomExistMessage: boolean;

    constructor(private _router: Router,
                private _socketService: SocketService){
                  this.showRoomExistMessage = false;
                }

    createRoom() {

      var router = this._router;

      this._socketService.createRoom(function (roomUrl) {
        let link = ['Room', { id: roomUrl }];
        router.navigate(link);
      });
    }

    joinRoom(roomUrl) {
      this.showRoomExistMessage = true;

      //Make this a promise instead that the service returns :)

      // this._socketService.joinRoom(roomUrl, function(result) {
      //   if(result) { //Room exist!
      //
      //   }
      //   else {
      //     showRoomExistMessage = true;
      //     //setTimeout(function() { showRoomExistMessage = false }, 4000);
      //   }
      // });
    }
 }
