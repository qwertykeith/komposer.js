import { get } from '@easy-webpack/core';
import { autoinject } from 'aurelia-dependency-injection';
import { KLoop } from './../models/kloop';
import { KLoopPlayer } from "./kLoopPlayer";
import { TransportEvents } from "./transportEvents";
import { AutoPlayerModel, AutoPlayerService } from "./autoPlayer";


export class KLoopState {
  channel: number;
  on: boolean;
}

class KChannel {
  autoPlayerData = new AutoPlayerModel();
  loopStates = new Map<KLoop, boolean>();
}

@autoinject()
export class Komposer {

  channels: KChannel[] = [];
  loopState = new Map<KLoop, KLoopState>();

  constructor(
    private transportEvents: TransportEvents,
    private player: KLoopPlayer,
    private auto: AutoPlayerService,

  ) {

    //    add one bank to start
    this.channels.push(<KChannel>{
      autoPlayerData: new AutoPlayerModel()
    });

    // start a background clock
    transportEvents.listen((measure) => {

      this.playAuto(measure);

    })

  }

  private playAuto(measure: number) {

    // this.banks.forEach(b => {

    //   var r = this.auto

    // });

  }

  setAuto(channel: number, on: boolean) {
    this.channels[channel].autoPlayerData.on = on;
  }

  getAuto(channel: number): boolean {
    return this.channels[channel].autoPlayerData.on;
  }

  on(loop: KLoop) {
    this.player.on(loop);

  }

  off(loop: KLoop) {
    // if(this.banks.get)
    this.player.off(loop);
  }

  addLoop(loop: KLoop, channel: number) {

    this.loopState.set(loop, <KLoopState>{ channel: channel, on: false })

    this.player.addLoop(loop);
    //    this.banks[channel].loopStates.set(loop, false);
  }

}
