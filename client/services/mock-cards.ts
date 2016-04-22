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

for(let i = 0; i < cardDeckValues.length; i++){
  CARDS.push(new Card(cardDeckValues[i]));
}

export var CARDS: Card[];
