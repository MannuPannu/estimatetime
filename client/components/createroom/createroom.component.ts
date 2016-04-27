
import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import { SocketService } from '../../services/socketio.service';

@Component({
    selector: 'createroom',
    templateUrl: 'client/components/createroom/createroom.html',
    providers: [SocketService]
})
export class CreateRoomComponent {

    constructor(private _router: Router,
                private _socketService: SocketService){}

    createRoom() {

      var router = this._router;

      this._socketService.createRoom(function (roomUrl) {
        let link = ['Room', { id: roomUrl }];
        router.navigate(link);
      });
    }
 }
