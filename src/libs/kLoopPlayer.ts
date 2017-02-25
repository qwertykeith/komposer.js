import { setTimeout } from 'timers';
import { log } from 'util';
import { SampleTriggerEvents } from './sampleTriggerEvents';
import { autoinject } from 'aurelia-dependency-injection';
import Tone from 'tone'
import { KLoop } from '../models/kloop'

class KSound {
  constructor(
    public sampler: Tone.Sampler,
    public sequence: Tone.Sequence
  ) { }

}

/**
 * engine for playing loops when triggered
 */
@autoinject()
export class KLoopPlayer {

  seqSamplers = new Map<KLoop, KSound>();
  loop: Tone.Sequence;

  constructor(private sampleTriggerEvents: SampleTriggerEvents) {

    Tone.Transport.loop = true;
    Tone.Transport.bpm.value = 140;

    this.loop = new Tone.Sequence((time, col) => {
    }, [0], "64n");

    this.loop.start();

  }

  get tempo(): number {
    return Tone.Transport.bpm.value;
  }

  set tempo(bpm: number) {
    if (bpm < 10) bpm = 10;
    if (bpm > 5000) bpm = 5000;
    Tone.Transport.bpm.value = bpm;
  }

  addSound(kloop: KLoop) {

    if (!this.seqSamplers.has(kloop)) {
      const sampler = new Tone.Sampler(kloop.url).toMaster();
      sampler.volume.value = (kloop.volume - 1) * 40;

      const seq = new Tone.Sequence((time, col) => {
        sampler.triggerAttack(0, time);
        this.sampleTriggerEvents.dispatch(kloop.guid);

        // console.log(kloop.url+' '+new Date());

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

  }

  off(kloop: KLoop) {
    const sampler = this.seqSamplers.get(kloop);
    if (sampler != null) {
      sampler.sequence.mute = true;
    }

  }

}
