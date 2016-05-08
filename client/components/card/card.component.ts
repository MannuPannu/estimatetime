import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Card } from '../../classes/Card'

@Component({
  selector: 'card',
  templateUrl: 'client/components/card/card.html',
  styleUrls: ['client/components/card/card.css'],
})
export class CardComponent {
  notVoted

  @Input()
    card: Card;

  @Output()
    cardClick = new EventEmitter();

  onClick() {
    this.cardClick.emit(this.card);
  }
}
