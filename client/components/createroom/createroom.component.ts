
import {Component} from 'angular2/core';
import { Router } from 'angular2/router';

@Component({
    selector: 'createroom',
    templateUrl: 'client/components/createroom/createroom.html',
})
export class CreateRoomComponent {

    constructor(private _router: Router){}

    createRoom() {
       let link = ['Room', { id: 1 }];
       this._router.navigate(link);
    }
 }
