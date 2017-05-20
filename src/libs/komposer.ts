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

  addChannel(name: string): KomposerChannel {
    const c = new KomposerChannel();
    c.name = name;
    this.channels.push(c);
    return c;
  }

}
