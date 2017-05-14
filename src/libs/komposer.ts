import Tone from 'tone';

export class Komposer {

  constructor() {

  }

  static set tempo(bpm: number) {
    Tone.Transport.bpm.value = bpm;

  }
  static get tempo(): number {
    return Tone.Transport.bpm.value;
  }
}
