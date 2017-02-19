
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

  get tempo(): any {
    return Tone.Transport.bpm.value;
  }

  set tempo(bpm: any) {
    Tone.Transport.bpm.value = bpm;
  }

  constructor() {

    Tone.Transport.loop = true;
    Tone.Transport.bpm.value = 140;


    this.loop = new Tone.Sequence((time, col) => {
    }, [0], "16n");
    //    this.loop.loopStart = '0m';
    // this.loop.humanize = true;
    //    this.loop.loopEnd = '1m';

    this.loop.start();

  }

  addSound(kloop: KLoop) {

    if (!this.seqSamplers.has(kloop)) {
      const sampler = new Tone.Sampler(kloop.url).toMaster();
      sampler.volume.value = (kloop.volume - 1) * 40;

    //  if (Math.random()<0.5) sampler.volume.value=-40;

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
