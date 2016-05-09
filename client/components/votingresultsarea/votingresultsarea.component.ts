
import {Component, Input} from '@angular/core';
import {Card} from '../../classes/Card';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'voting-results-area',
  templateUrl: 'client/components/votingresultsarea/votingresultsarea.html',
  styleUrls: ['client/components/votingresultsarea/votingresultsarea.css'],
  directives: [CardComponent],
})
export class VotingResultsAreaComponent {
  @Input()
    voteConnections: any

}
