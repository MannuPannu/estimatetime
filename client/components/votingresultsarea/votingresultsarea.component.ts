
import {Component, Input} from '@angular/core';
import {VoteSlotComponent} from '../voteslot/voteslot.component';
import {VoteSlot} from '../../classes/VoteSlot';

@Component({
  selector: 'voting-results-area',
  templateUrl: 'client/components/votingresultsarea/votingresultsarea.html',
  styleUrls: ['client/components/votingresultsarea/votingresultsarea.css'],
  directives: [VoteSlotComponent],
})
export class VotingResultsAreaComponent {
  @Input()
    voteSlots: VoteSlot[]
}
