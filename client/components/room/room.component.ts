import {Component, OnInit} from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import { SocketService } from '../../services/socket.service';

import {VotingAreaComponent} from '../votingarea/votingarea.component';
import {VotingResultsAreaComponent} from '../votingresultsarea/votingresultsarea.component';
import {CardsService} from '../../services/cards.service';
import {Card} from '../../classes/Card';

@Component({
    selector: 'room',
    templateUrl: 'client/components/room/room.html',
    directives: [VotingAreaComponent, VotingResultsAreaComponent],
    providers: [CardsService]
})
export class RoomComponent implements OnActivate {
  cards: Card[];
  voteConnections: {};
  roomId: string;
  isAdmin: boolean;

  constructor(private _cards: CardsService,
              private _router: Router,
              private _socketService: SocketService){}

  routerOnActivate(curr: RouteSegment): void {
      var that = this;

      var roomUrl = curr.getParam('id');
      that.roomId = roomUrl;

      this._socketService.onVoteUpdate(function(voteConnections) {
        that.voteConnections = voteConnections;
      });

      that._socketService.joinRoom(roomUrl).then(result => that.afterJoin(result, roomUrl));
  }

  afterJoin(result, roomUrl){
    if(result.joinSucceeded){
      this.cards = this._cards.getCards();
      this.isAdmin = result.isAdmin;
    }
    else {
      this._router.navigate(['/createroom']);
    }
  }

  leaveRoom(){
    var that = this;
    this._socketService.leaveRoom(this.roomId).then(function(result) {
      that._router.navigate(['/createroom']);
    });
  }
}
