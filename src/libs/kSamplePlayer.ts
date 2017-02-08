
import Tone from 'tone'
import { KLoop } from '../models/kloop'
// import KSampler from '../models/ksampler'


class KSound {
  constructor(
    public sampler: Tone.Sampler,
    public sequence: Tone.Sequence
  ) { }

}

export class KSamplePlayer {

  seqSamplers = new Map<KLoop, KSound>();
  // soundsOn = new Map<string, number>();
  loop: Tone.Sequence;

  constructor() {

    Tone.Transport.loop = true;


    this.loop = new Tone.Sequence((time, col) => {
      //      console.log(time);

      // this.soundsOn.forEach((value, key) => {
      //   if (this.seqSamplers.has(key)) {
      //     this.seqSamplers.get(key).triggerAttack(0, time);
      //   }
      // });

    }, [0], "16n");
    //    this.loop.loopStart = '0m';
    //    this.loop.loopEnd = '1m';

    this.loop.start();

  }

  addSound(kloop: KLoop) {

    if (!this.seqSamplers.has(kloop)) {
      const sampler = new Tone.Sampler(kloop.url).toMaster();


      const seq = new Tone.Sequence((time, col) => {
        sampler.triggerAttack(0, time);
      }, [0], kloop.beat);

      seq.start(0);
      seq.mute = true;

      const ksound = new KSound(sampler, seq);

      this.seqSamplers.set(kloop, ksound);
    }
  }

  start() {

    Tone.Transport.start();

  }

  stop() {

    Tone.Transport.stop();

  }

  on(kloop: KLoop) {

    const sampler = this.seqSamplers.get(kloop);
    if (sampler != null) {
      //      debugger;
      sampler.sequence.mute = false;
    }


    //    this.soundsOn.set(soundUrl, true);

  }

  off(kloop: KLoop) {
    const sampler = this.seqSamplers.get(kloop);
    if (sampler != null) {
      sampler.sequence.mute = true;
    }


    //    this.soundsOn.delete(soundUrl);


  }

}
