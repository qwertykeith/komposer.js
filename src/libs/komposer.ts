import Tone from 'tone';

export class Komposer {

  static get tempo(): number {
    return Tone.Transport.bpm.value;
  }

  static set tempo(bpm: number) {
    if (bpm < 10) bpm = 10;
    if (bpm > 5000) bpm = 5000;
    Tone.Transport.bpm.value = bpm;
  }


  static start() {
    Tone.Transport.loop = true;
    Tone.Transport.start();
  }

  static stop() {
    Tone.Transport.stop();
  }



}
