import {Component} from 'angular2/core';
import {CardComponent} from '../card/card.component';
import {CardsService} from '../../services/cards.service';

@Component({
    selector: 'my-app',
    templateUrl: 'client/components/app/app.html',
    directives: [CardComponent],
    providers: [CardsService]
})
export class AppComponent {
   cards: string[];

   constructor(private _cards: CardsService){
     this.cards = this._cards.getCards();
   }
 }
