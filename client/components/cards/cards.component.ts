import {Component, Input} from 'angular2/core';
import {Card} from '../../classes/Card';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'cards',
  templateUrl: 'client/components/cards/cards.html',
  directives: [CardComponent],
})
export class CardsComponent {
  @Input()
    cards: Card[];
}
