export class VoteSlot {

  constructor(public timeInHours: string,
              public showValue: boolean,
              public voted: boolean,
              public voter: boolean){
  }
}
