import Tone from 'tone';
// import {  KomposerAppState } from './../komposerState';
import { autoinject } from 'aurelia-dependency-injection';
import { Komposer } from "../komposer";

@autoinject()
export class ChangeTempoCommandHandler {

  constructor() {

  }

  execute(bpm: number) {
    if (bpm < 10) bpm = 10;
    if (bpm > 5000) bpm = 5000;
    Komposer.tempo = bpm;
//    this.state.data.tempo = bpm;
  }

}
