import {Component, Input, OnInit} from 'angular2/core';

@Component({
  selector: 'card',
  templateUrl: 'app/templates/card.html',
  styleUrls: ['app/styles/card.css']
})
export class CardComponent implements OnInit {
  @Input()
    cardName: string;

    ngOnInit(){
      console.log("Init");
      console.log(this.cardName);
    }
}
