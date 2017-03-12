import { ChangeTempoCommandHandler } from './changeTempo';

import Tone from 'tone';
import { KomposerState } from './../komposerState';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject()
export class ActivateKomposerCommandHandler {

  constructor(
    private state: KomposerState,
    private changeTempoCommandHandler: ChangeTempoCommandHandler) {

  }

  execute(active: boolean) {

    if (active) {
      Tone.Transport.loop = true;
      Tone.Transport.start();

      this.changeTempoCommandHandler.execute(Tone.Transport.bpm.value);

    } else {
      Tone.Transport.stop();
    }

  }

}
