export class Card {
  selected: boolean;
  cardEmpty: boolean;
  cardVotedHidden: boolean;
  cardVoted: boolean;

  constructor(public timeInHours: string){
    this.selected = false;
    this.cardEmpty = false;
    this.cardVotedHidden = false;;
    this.cardVoted = false;
  }
}
