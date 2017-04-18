import Tone from 'tone';
import {  KomposerAppState } from './../komposerState';
import { autoinject } from 'aurelia-dependency-injection';

@autoinject()
export class ChangeTempoCommandHandler {

  constructor(private state: KomposerAppState) {

  }

  execute(bpm: number) {
    if (bpm < 10) bpm = 10;
    if (bpm > 5000) bpm = 5000;
    Tone.Transport.bpm.value = bpm;
    this.state.data.tempo = bpm;
  }

}