import {Component, Input} from '@angular/core';
import {Card} from '../../classes/Card';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'votingarea',
  templateUrl: 'client/components/votingarea/votingarea.html',
  directives: [CardComponent],
})
export class VotingAreaComponent {
  @Input()
    cards: Card[];

  selectedTime = "";
  selectedCard: Card;
  cardsVisible = true;

  toggleCardVisibility(){
    this.cardsVisible = !this.cardsVisible;
  }

  cardClicked(card) {

    this.cards.forEach(card => {
      card.selected = false;
    });

    //Toggle selection
    card.selected = true;
    this.selectedTime = card.timeInHours;

    this.selectedCard = card;
  }
}
