import {Component, Input, OnInit} from 'angular2/core';

@Component({
  selector: 'card',
  templateUrl: 'client/components/card/card.html',
  styleUrls: ['client/components/card/card.css']
})
export class CardComponent {
  @Input()
    cardName: string;
}
