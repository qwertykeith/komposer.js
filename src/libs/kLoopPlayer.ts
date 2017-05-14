import { KLoop } from './../models/kloop';
import { setTimeout } from 'timers';
import { SampleTriggerEvents } from './sampleTriggerEvents';
import { autoinject } from 'aurelia-dependency-injection';
import Tone from 'tone'

@autoinject()
export class KLoopPlayer {

  private seq: Tone.Sequence;
  private sampleTriggerEvents: SampleTriggerEvents = new SampleTriggerEvents();

  isLoaded = false;

  constructor(private kloop: KLoop) {
    this.load();
  }

  getLoop(): KLoop {
    return this.kloop;
  }

  private load() {

    const wavLoaded = () => {
      this.isLoaded = true;
    };

    // create the sampler .. and start the sequence when loaded
    const sampler = new Tone.Sampler(this.kloop.url, wavLoaded).toMaster();
    sampler.volume.value = (this.kloop.volume - 1) * 40;

    // create the sequence 
    const seq = new Tone.Sequence((time, col) => {

      if (this.isLoaded) sampler.triggerAttack(0, time);
      this.sampleTriggerEvents.dispatch(this.kloop.guid);

    }, [0], this.convertToToneTime(this.kloop.beat));

    seq.mute = true;
    seq.start(0);
    this.seq = seq;

  }

  /**
   * eg 1/16 should be "16n"
   */
  private convertToToneTime(division: number) {
    const notesInMeasure = Math.round(1 / division);
    return `${notesInMeasure}n`;
  }

  on() {
    this.seq.mute = false;
  }

  off(kloop: KLoop) {
    this.seq.mute = true;
  }

}
