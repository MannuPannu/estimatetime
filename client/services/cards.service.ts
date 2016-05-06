
import {CARDS} from './mock-cards'
import {Injectable} from '@angular/core';
import {Card} from '../classes/Card'

var cardDeckValues = [
  "0",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "20",
  "40",
  "100",
  "?",
];

@Injectable()
export class CardsService {
  getCards(){

    let cards:Card[] = [];

    for(let i = 0; i < cardDeckValues.length; i++){
      cards.push(new Card(cardDeckValues[i]));
    }

    return cards;
  }
}
