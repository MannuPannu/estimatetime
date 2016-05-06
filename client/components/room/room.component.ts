import {Component, OnInit} from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';

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
  roomId: number;

  constructor(private _cards: CardsService,
              private _router: Router){}

  routerOnActivate(curr: RouteSegment): void {
      this.roomId = +curr.getParam('id');

      this.cards = this._cards.getCards();
  }
}
