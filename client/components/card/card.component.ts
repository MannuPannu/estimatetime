import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Card } from '../../classes/Card'

@Component({
  selector: 'card',
  templateUrl: 'client/components/card/card.html',
  styleUrls: ['client/components/card/card.css'],
})
export class CardComponent {
  @Input()
    card: Card;
  @Input()
    enabled: boolean;

  @Output()
    cardClick = new EventEmitter();

  onClick() {
    if(this.card.timeInHours !== '' && this.enabled){
      this.cardClick.emit(this.card);
    }
  }
}
