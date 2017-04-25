import { log } from 'util';
import { KLoopPlayer } from './kLoopPlayer';
import { KLoop } from './../models/kloop';
import { autoinject } from 'aurelia-dependency-injection';
import { TransportEvents } from './transportEvents';


export class AutoPlayerModel {
  public on: boolean = true;
  public eventsPerMeasure = 16; // 16
  public lengthMeasures = 2;
  public changeEveryMeasure = 8;
  private lastLoop: KLoop;
}

/**
 * automates a player
 */
@autoinject()
export class AutoPlayerService {

  //private kLoopPlayer: KLoopPlayer
  getState(data: AutoPlayerModel, loopStates: Map<KLoop, boolean>, measure: number): Map<KLoop, boolean> {

    let i = 0;


    const arrangeCurve = (measure: number): number => {
      var progress = measure / data.changeEveryMeasure;
      var rounded = Math.floor(progress)
      var fractionPart = progress - rounded;

      // return (fractionPart < (1 - 1 / 8))||(fractionPart < 0.5 && fractionPart > (0.5 - 1 / 8))
      //   ? rounded
      //   : progress;

      return (fractionPart < 0.75)
        ? rounded
        : progress;
    };

    /////-------------------
    if (!data.on) return loopStates;

    const eventIndex = Math.floor(measure * data.eventsPerMeasure);
    const eventLength = data.lengthMeasures * data.eventsPerMeasure;

    let loopIndex = eventIndex % eventLength;

    const addIndex = arrangeCurve(measure) * data.eventsPerMeasure;
    // console.log(`add index ${addIndex}`);


    loopIndex = Math.floor(loopIndex + addIndex) % loopStates.size;

    // const loops = data.kLoopPlayer.getloops();

    //    const loops = loopStates.keys();
    // const toPlay = loopStates. [loopIndex) ];

    const newLoopStates = new Map<KLoop, boolean>();

    let ii = 0;
    loopStates.forEach((value, loop) => {

      const isOn = ii == loopIndex;
      newLoopStates.set(loop, isOn);
      ii++;
    });

    return newLoopStates;

    // data.kLoopPlayer.on(toPlay)
    // if (data.lastLoop && data.lastLoop != toPlay) data.kLoopPlayer.off(data.lastLoop)
    // data.lastLoop = toPlay; ``


    // console.log(loopIndex + ' - ' + s.beat);
    /////-------------------


  }


}
