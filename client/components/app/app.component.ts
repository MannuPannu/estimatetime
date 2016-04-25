import {Component} from 'angular2/core';
import {CardsComponent} from '../cards/cards.component';
import {CardsService} from '../../services/cards.service';
import {Card} from '../../classes/Card';
import {CreateRoomComponent} from '../createroom/createroom.component'

@Component({
    selector: 'my-app',
    templateUrl: 'client/components/app/app.html',
    directives: [CardsComponent, CreateRoomComponent],
    providers: [CardsService]
})
export class AppComponent {
   cards: Card[];

   constructor(private _cards: CardsService){
     this.cards = this._cards.getCards();
   }
 }
