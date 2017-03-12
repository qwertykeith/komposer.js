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

  public on: boolean=true;
  public eventsPerMeasure = 16; // 16
  public lengthMeasures = 2;
  public changeEveryMeasure = 8;
  private lastLoop: KLoop;

  constructor(private transportEvents: TransportEvents, private kLoopPlayer: KLoopPlayer) {

    let i = 0;


    const arrangeCurve = (measure: number): number => {
      var progress = measure / this.changeEveryMeasure;
      var rounded = Math.floor(progress)
      var fractionPart = progress - rounded;

      // return (fractionPart < (1 - 1 / 8))||(fractionPart < 0.5 && fractionPart > (0.5 - 1 / 8))
      //   ? rounded
      //   : progress;

      return (fractionPart < 0.75)
        ? rounded
        : progress;
    };

    transportEvents.listen((measure) => {
      if (!this.on) return;

      const eventIndex = Math.floor(measure * this.eventsPerMeasure);
      const eventLength = this.lengthMeasures * this.eventsPerMeasure;

      let loopIndex = eventIndex % eventLength;

      const addIndex = arrangeCurve(measure) * this.eventsPerMeasure;
      // console.log(`add index ${addIndex}`);


      loopIndex += addIndex;

      const loops = this.kLoopPlayer.getloops();

      const s = loops[Math.floor(loopIndex) % loops.length];
      this.kLoopPlayer.on(s)
      if (this.lastLoop && this.lastLoop != s) this.kLoopPlayer.off(this.lastLoop)
      this.lastLoop = s;


      // console.log(loopIndex + ' - ' + s.beat);

    })

  }


}
