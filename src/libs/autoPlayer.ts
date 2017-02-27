import { log } from 'util';
import { KLoopPlayer } from './kLoopPlayer';
import { KLoop } from './../models/kloop';
import { autoinject } from 'aurelia-dependency-injection';
import { TransportEvents } from './transportEvents';
/**
 * automates a player
 */
@autoinject()
export class AutoPlayer {

  public on: boolean;
  public changeNoteEvery = 0.125;
  public changeSequenceEvery = 4;
  public sequenceLength = 2;
  private lastNoteChange = -1;
  private lastSequeceChange = -1;
  private lastLoop: KLoop;
  private loopsSequence: KLoop[] = [];

  constructor(private transportEvents: TransportEvents, private kLoopPlayer: KLoopPlayer) {

    let i = 0;

    transportEvents.listen((measure) => {
      if (!this.on) return;

      // debugger;/

      //      console.log('@@@@');

      //    if (this.player) return;

      // const msEachNote = 100;

      // console.log('AAAA');
      // console.log(this);

      // should we change something?
      const shouldChangeNote = (measure >= (this.lastNoteChange + this.changeNoteEvery));
      if (!shouldChangeNote) return;
      this.lastNoteChange = measure;

      const shouldChangeSequence = (measure >= (this.lastSequeceChange + this.changeSequenceEvery));
      if (shouldChangeSequence) {

        this.lastSequeceChange = measure;
        console.log('S CHANGED');


        const loops = this.kLoopPlayer.getloops();

        const notesInSequence = this.sequenceLength / this.changeNoteEvery;
        this.loopsSequence = Array.apply(0, Array(notesInSequence)).map(i => {
          const ii = Math.floor(Math.random() * loops.length);
          return loops[ii];
        });
      }

      if (!this.loopsSequence.length) return;



      // const sequenceLenMeasures=this.loopsSequence.length*this.changeNoteEvery;
      // const thisSequnceRatio=
      const si = i % this.loopsSequence.length;

      const s = this.loopsSequence[si];
      this.kLoopPlayer.on(s)
      if (this.lastLoop) this.kLoopPlayer.off(this.lastLoop)
      this.lastLoop = s;

      // if (i % changeEvery == 0) {
      //   // change a random one
      //   const loopii = Math.floor(Math.random() * loops.length);
      //   const seqii = Math.floor(Math.random() * seq.length);
      //   seq[seqii] = loops[loopii];
      // }

      i++;

    })

  }


}
