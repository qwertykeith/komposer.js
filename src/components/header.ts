import { autoinject } from 'aurelia-dependency-injection';

import { Komposer } from "../libs/komposer";
import { ChangeTempoCommandHandler } from "../libs/commands/changeTempo";

@autoinject()
export class HeaderCustomElement {

  constructor(private changeTempoCommandHandler: ChangeTempoCommandHandler) {

  }


  get tempo(): number {
    return Math.log(Komposer.tempo) / Math.log(2);

    //    return Math.round(this.state.data.tempo);
  }

  set tempo(bpm: number) {
    const t = Math.pow(2, bpm);
    this.changeTempoCommandHandler.execute(t);
    // Komposer.tempo = bpm;
  }


}
