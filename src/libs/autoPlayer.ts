import { log } from 'util';
import { KLoopPlayer, KLoop } from './kLoopPlayer';
import { autoinject } from 'aurelia-dependency-injection';
import { TransportEvents } from './transportEvents';


export class AutoPlayerModel {
  public on: boolean = false;
  public eventsPerMeasure = 16; // 16
  public lengthMeasures = 2;
  public changeEveryMeasure = 8;
  // private lastLoop: KLoop;
}

/**
 * automates a player
 */
@autoinject()
export class AutoPlayer {

  //private kLoopPlayer: KLoopPlayer
  setState(data: AutoPlayerModel, loopPlayers: KLoopPlayer[], measure: number) {

    let i = 0;


    const arrangeCurve = (measure: number): number => {
      var progress = measure / data.changeEveryMeasure;
      var rounded = Math.floor(progress);
      var fractionPart = progress - rounded;

      // return (fractionPart < (1 - 1 / 8))||(fractionPart < 0.5 && fractionPart > (0.5 - 1 / 8))
      //   ? rounded
      //   : progress;

      return (fractionPart < 0.75)
        ? rounded
        : progress;
    };

    /////-------------------
    if (!data.on) return;

    const eventIndex = Math.floor(measure * data.eventsPerMeasure);
    const eventLength = data.lengthMeasures * data.eventsPerMeasure;

    let loopIndex = eventIndex % eventLength;

    const addIndex = arrangeCurve(measure) * data.eventsPerMeasure;
    // console.log(`add index ${addIndex}`);


    loopIndex = Math.floor(loopIndex + addIndex) % loopPlayers.length;

    let ii = 0;
    loopPlayers.forEach(loop => {
      const isOn = ii == loopIndex;
      loop.on = isOn;
      ii++;
    });

  }


}
