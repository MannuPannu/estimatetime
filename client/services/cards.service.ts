
import {CARDS} from './mock-cards'
import {Injectable} from 'angular2/core';

@Injectable()
export class CardsService {
  getCards(){
    return CARDS;
  }
}
