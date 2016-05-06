import {Component, OnInit} from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import { SocketService } from '../../services/socket.service';

import {CardsComponent} from '../cards/cards.component';
import {CardsService} from '../../services/cards.service';
import {Card} from '../../classes/Card';

@Component({
    selector: 'room',
    templateUrl: 'client/components/room/room.html',
    directives: [CardsComponent],
    providers: [CardsService]
})
export class RoomComponent implements OnActivate {
  cards: Card[];
  roomId: string;

  constructor(private _cards: CardsService,
              private _router: Router,
              private _socketService: SocketService){}

  routerOnActivate(curr: RouteSegment): void {
      this.roomId = curr.getParam('id');
      this.cards = this._cards.getCards();
  }

  leaveRoom(){
    var that = this;
    this._socketService.leaveRoom(this.roomId.toString()).then(function(result) {
      that._router.navigate(['/createroom']);
    });
  }
}
