import { KLoop } from './kLoopPlayer';
import Tone from 'tone';
import { KomposerChannel } from "./komposerChannel";

export class Komposer {

  channels: KomposerChannel[] = [];

  constructor() {

  }

  static set tempo(bpm: number) {
    Tone.Transport.bpm.value = bpm;

  }
  static get tempo(): number {
    return Tone.Transport.bpm.value;
  }

  addChannel(name: string, loops?: KLoop[]): KomposerChannel {
    const c = new KomposerChannel();
    c.name = name;
    this.channels.push(c);

    if (loops) {
      loops.forEach(loop => c.addLoop(loop));
    }

    return c;
  }

}
