import {Component, Input, OnInit} from 'angular2/core';
import { Card } from '../../classes/Card'

@Component({
  selector: 'card',
  templateUrl: 'client/components/card/card.html',
  styleUrls: ['client/components/card/card.css']
})
export class CardComponent {
  @Input()
    card: Card;


  OnClick() {
    
  }
}
