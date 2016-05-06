import {Component, OnInit} from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import {CreateRoomComponent} from '../createroom/createroom.component'
import {RoomComponent} from '../room/room.component'
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'my-app',
    templateUrl: 'client/components/app/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, SocketService]
})
@Routes([
  {
    path: '/createroom',
    component: CreateRoomComponent,
  },
  {
    path: '/',
    component: CreateRoomComponent,
  },
  {
    path: '/room/:id',
    component: RoomComponent,
  }
])
export class AppComponent implements OnInit {
  constructor(private socketService: SocketService,
              private router: Router){}

  ngOnInit(){
    this.socketService.connectToSocket();
  }
 }
