import {Component, Input} from '@angular/core';
import {Card} from '../../classes/Card';
import {CardComponent} from '../card/card.component';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'votingarea',
  templateUrl: 'client/components/votingarea/votingarea.html',
  directives: [CardComponent],
})
export class VotingAreaComponent {
  @Input()
    cards: Card[];
  @Input()
    roomUrl: string;

  selectedTime = "";
  selectedCard: Card;
  cardsVisible = true;

  constructor(private _socketService: SocketService){
    var that = this;

    this._socketService.onResetVotes(function() {
      that.cards.forEach(card => {
        card.selected = false;
      });
    });
  }

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

    //Emit votes to other clients
    this._socketService.vote(this.selectedTime, this.roomUrl);
  }
}
