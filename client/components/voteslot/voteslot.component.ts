import {Component, Input} from '@angular/core';
import { VoteSlot } from '../../classes/VoteSlot'

@Component({
  selector: 'voteslot',
  templateUrl: 'client/components/voteslot/voteslot.html',
  styleUrls: ['client/components/voteslot/voteslot.css'],
})
export class VoteSlotComponent {
  @Input()
    voteSlot: VoteSlot;
}
