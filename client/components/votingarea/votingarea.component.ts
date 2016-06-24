import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../classes/Card';
import {CardComponent} from '../card/card.component';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'votingarea',
  templateUrl: 'client/components/votingarea/votingarea.html',
  directives: [CardComponent],
})
export class VotingAreaComponent implements OnInit {
  @Input()
    cards: Card[];
  @Input()
    roomUrl: string;
  @Input()
    cardsEnabled: boolean;

  selectedTime = "";
  selectedCard: Card;
  cardsVisible: boolean;

  constructor(private _socketService: SocketService){
    this.cardsVisible = true;
  }

  ngOnInit(){
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
