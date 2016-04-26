import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {CreateRoomComponent} from '../createroom/createroom.component'
import {RoomComponent} from '../room/room.component'
import { SocketService } from '../../services/socketio.service';

@Component({
    selector: 'my-app',
    templateUrl: 'client/components/app/app.html',
    directives: [CreateRoomComponent, ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, SocketService]
})
@RouteConfig([
  {
    path: '/createroom',
    name: 'Create or join room',
    component: CreateRoomComponent,
    useAsDefault: true
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: RoomComponent,
  }
])
export class AppComponent {
  constructor(private socketService: SocketService){}
 }
