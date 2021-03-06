import {Component, OnInit} from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import {CookieService} from 'angular2-cookie/core';
import {VotingAreaComponent} from '../votingarea/votingarea.component';
import {VotingResultsAreaComponent} from '../votingresultsarea/votingresultsarea.component';
import {CardsService} from '../../services/cards.service';
import {Card} from '../../classes/Card';
import {VoteSlot} from '../../classes/VoteSlot';
import {CookieInfo} from '../../classes/CookieInfo';

declare var _: any;

@Component({
    selector: 'room',
    templateUrl: 'client/components/room/room.html',
    directives: [VotingAreaComponent, VotingResultsAreaComponent],
    providers: [CardsService, CookieService]
})
export class RoomComponent implements OnActivate {
  cards: Card[];
  voteSlots: VoteSlot[];
  voteConnections: {};
  roomId: string;
  isAdmin: boolean;
  voter: boolean;

  constructor(private _cards: CardsService,
              private _router: Router,
              private _socketService: SocketService,
              private _cookieService: CookieService){
                this.voteSlots = [];
              }

  routerOnActivate(curr: RouteSegment): void {
      var that = this;
      this.cards = this._cards.getCards();

      var roomUrl = curr.getParam('id');
      that.roomId = roomUrl;

      this._socketService.onVoteUpdate(function(voteConnections) {
        that.voteConnections = voteConnections; //todo: remove this later

        that.voteSlots = [];

        var allHasVoted = false;
          if(voteConnections.filter(v => {
          return v.voted !== true;
        }).length === 0) {
          allHasVoted = true;
        }

        voteConnections.forEach(v => {
          that.voteSlots.push(new VoteSlot(v.voteValue, allHasVoted, v.voted, v.voter));
        });

        if(allHasVoted) {
          _.shuffle(that.voteSlots);
        }

        that.voteSlots.sort(function(a, b) {
          if(a.voted) {
            return -1;
          }

          if(!a.voted){
            return 1;
          }

          return 0;
        });

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
