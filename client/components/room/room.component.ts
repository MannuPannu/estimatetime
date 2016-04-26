import {Component, OnInit} from 'angular2/core';
import { RouteParams } from 'angular2/router';

import {CardsComponent} from '../cards/cards.component';
import {CardsService} from '../../services/cards.service';
import {Card} from '../../classes/Card';

@Component({
    selector: 'room',
    templateUrl: 'client/components/room/room.html',
    directives: [CardsComponent],
    providers: [CardsService]
})
export class RoomComponent implements OnInit {
  cards: Card[];
  roomId: number;

  constructor(private _cards: CardsService,
              private _routeParams: RouteParams){

    this.cards = this._cards.getCards();
  }

  ngOnInit() {
    this.roomId = +this._routeParams.get('id');
  }
}
