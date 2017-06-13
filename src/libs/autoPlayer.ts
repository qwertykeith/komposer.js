import { log } from 'util';
import { KLoopPlayer, KLoop } from './kLoopPlayer';
import { autoinject } from 'aurelia-dependency-injection';
import { TransportEvents } from './transportEvents';


export class AutoPlayerModel {
  on: boolean = false;
  eventsPerMeasure = 16; // 16
  phraseLength = 2;
  loopLength = 8;
  changeEveryMeasure = 8;

  fillOn = false;
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


    const arrangeCurve = (measure: number, fill: boolean): number => {
      var progress = measure / data.changeEveryMeasure;
      var rounded = Math.floor(progress);
      var fractionPart = progress - rounded;

      return (fractionPart < 0.75 && fill)
        ? rounded
        : progress;
    };

    /////-------------------
    if (!data.on) return;

    measure = measure % data.loopLength;

    // measure=measure>=1
    //   ? measure%data.loopLength
    //   :

    const eventIndex = Math.floor(measure * data.eventsPerMeasure);
    const eventLength = data.phraseLength * data.eventsPerMeasure;

    let loopIndex = eventIndex % eventLength;

    const addIndex = arrangeCurve(measure, data.fillOn) * data.eventsPerMeasure;
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
