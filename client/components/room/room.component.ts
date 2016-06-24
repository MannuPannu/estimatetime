import {Component, OnInit} from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import {CookieService} from 'angular2-cookie/core';

import {VotingAreaComponent} from '../votingarea/votingarea.component';
import {VotingResultsAreaComponent} from '../votingresultsarea/votingresultsarea.component';
import {CardsService} from '../../services/cards.service';
import {Card} from '../../classes/Card';
import {CookieInfo} from '../../classes/CookieInfo';

@Component({
    selector: 'room',
    templateUrl: 'client/components/room/room.html',
    directives: [VotingAreaComponent, VotingResultsAreaComponent],
    providers: [CardsService, CookieService]
})
export class RoomComponent implements OnActivate {
  cards: Card[];
  voteConnections: {};
  roomId: string;
  isAdmin: boolean;
  voter: boolean;

  constructor(private _cards: CardsService,
              private _router: Router,
              private _socketService: SocketService,
              private _cookieService: CookieService){}

  routerOnActivate(curr: RouteSegment): void {
      var that = this;
      this.cards = this._cards.getCards();

      var roomUrl = curr.getParam('id');
      that.roomId = roomUrl;

      this._socketService.onVoteUpdate(function(voteConnections) {
        that.voteConnections = voteConnections;
      });

      that._socketService.joinRoom(roomUrl).then(result => that.afterJoin(result, roomUrl));
  }

  afterJoin(result, roomUrl){
    if(result.joinSucceeded){

      this.voter = true;

      var cookieObj = this._cookieService.getObject("isAdmin");

      let isAdminCookie: CookieInfo = null;

      if(cookieObj) {
        isAdminCookie = new CookieInfo(cookieObj);
      }

      this.isAdmin = result.isAdmin
          || (isAdminCookie !== null && isAdminCookie.isAdmin && isAdminCookie.roomUrl === roomUrl);

      this._cookieService.putObject("isAdmin", { isAdmin: this.isAdmin, roomUrl: roomUrl });
    }
    else {
      this._router.navigate(['/createroom']);
    }
  }

  resetVotes() {
    this._socketService.resetVotes(this.roomId);
  }

  toggleVoter() {
    this._socketService.toggleVoter(this.roomId).then(result => this.voter = result);
  }

  revealVotes() {
    this._socketService.revealVotes(this.roomId);
  }

  leaveRoom(){
    var that = this;
    this._socketService.leaveRoom(this.roomId).then(function(result) {
      that._router.navigate(['/createroom']);
    });
  }
}
