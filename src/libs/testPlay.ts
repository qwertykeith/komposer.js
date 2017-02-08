
import Tone from 'tone'
// import KSampler from '../models/ksampler'

export class TestPlay {

  sounds = new Map<string, Tone.Sampler>();
  soundsOn = new Map<string, boolean>();
  loop: Tone.Sequence;

  constructor() {

    Tone.Transport.loop = true;


    this.loop = new Tone.Sequence((time, col) => {
      //      console.log(time);

      this.soundsOn.forEach((value, key) => {
        if (this.sounds.has(key)) {
          this.sounds.get(key).triggerAttack(0, time);
        }
      });

    }, [0], "16n");
    //    this.loop.loopStart = '0m';
    //    this.loop.loopEnd = '1m';

    this.loop.start();

  }

  addSound(url: string) {

    //    const url = `https://s3-ap-southeast-2.amazonaws.com/ksounds/${file}`;

    if (!this.sounds.has(url)) {
      const sampler = new Tone.Sampler(url).toMaster();
      this.sounds.set(url, sampler)
    }
  }

  start() {

    Tone.Transport.start();

  }

  stop() {

    Tone.Transport.stop();

  }

  on(soundUrl: string) {

    this.soundsOn.set(soundUrl, true);

  }

  off(soundUrl: string) {

    this.soundsOn.delete(soundUrl);


  }

}
