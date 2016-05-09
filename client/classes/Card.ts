export class Card {
  selected: boolean;
  cardEmpty: boolean;
  cardVotedHidden: boolean;
  cardVoted: boolean;
  selectable: boolean;

  constructor(public timeInHours: string){
    this.selectable = timeInHours !== '';
    this.selected = false;
    this.cardEmpty = false;
    this.cardVotedHidden = false;;
    this.cardVoted = false;
  }
}
