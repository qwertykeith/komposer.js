import { setTimeout } from 'timers';
import { SampleTriggerEvents } from './sampleTriggerEvents';
import { autoinject } from 'aurelia-dependency-injection';
// import { Tone } from 'tone';
import Tone from 'tone'
// import { Tone } from 'tone';
import { KLoop } from '../models/kloop'

/**
 * internal class to optimise lookup times
 */
class KSound {
  constructor(
    // public sampler: Tone.Sampler,
    private sequence: Tone.Sequence
  ) { }

  on() { this.sequence.mute = false; }
  off() { this.sequence.mute = true; }

}

/**
 * engine for playing loops when triggered
 */
@autoinject()
export class KLoopPlayer {

  seqSamplers = new Map<KLoop, KSound>();

  constructor(private sampleTriggerEvents: SampleTriggerEvents) {
  }

  getloops(): KLoop[] {
    return Array.from(this.seqSamplers.keys());
  }

  /**
   * eg 1/16 should be "16n"
   */
  private convertToToneTime(division: number) {
    const notesInMeasure = Math.round(1 / division);
    return `${notesInMeasure}n`;
  }

  addLoop(kloop: KLoop) {

    if (!this.seqSamplers.has(kloop)) {
      const sampler = new Tone.Sampler(kloop.url).toMaster();
      sampler.volume.value = (kloop.volume - 1) * 40;

      const seq = new Tone.Sequence((time, col) => {
        sampler.triggerAttack(0, time);
        this.sampleTriggerEvents.dispatch(kloop.guid);

        // console.log(kloop.url+' '+new Date());

        //      }, [0], kloop.beat);
      }, [0], this.convertToToneTime(kloop.beat));

      seq.start(0);
      seq.mute = true;

      const ksound = new KSound(seq);

      this.seqSamplers.set(kloop, ksound);
    }
  }

  on(kloop: KLoop) {

    const sampler = this.seqSamplers.get(kloop);
    if (sampler != null) {
      //      debugger;
      sampler.on();
    }

  }

  off(kloop: KLoop) {
    const sampler = this.seqSamplers.get(kloop);
    if (sampler != null) {
      sampler.off();
    }

  }

}
