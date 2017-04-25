import { get } from '@easy-webpack/core';
import { autoinject } from 'aurelia-dependency-injection';
import { KLoop } from './../models/kloop';
import { KLoopPlayer } from "./kLoopPlayer";
import { TransportEvents } from "./transportEvents";
import { AutoPlayerModel, AutoPlayerService } from "./autoPlayer";


// class KLoopState {
//   channel: number;
//   on: boolean;
// }

class KChannelInfo {
  autoPlayerData = new AutoPlayerModel();
  loopStates = new Map<KLoop, boolean>();
}

@autoinject()
export class Komposer {

  channels = new Map<number, KChannelInfo>();
  // loopState = new Map<KLoop, boolean>();

  constructor(
    private transportEvents: TransportEvents,
    private player: KLoopPlayer,
    private auto: AutoPlayerService,

  ) {

    // add one channel to start
    this.channels.set(0, new KChannelInfo());

    // start a background clock
    transportEvents.listen((measure) => {

      this.playAuto(measure);

    })

  }

  private playAuto(measure: number) {

    this.channels.forEach((info, chan) => {
      if (info.autoPlayerData.on) {
        const newState = this.auto.getState(info.autoPlayerData, info.loopStates, measure);

        newState.forEach((value, loop) => {
          this.loopOn(loop, value);
        });
      }
    });

  }

  setAuto(channel: number, on: boolean) {
    const c = this.channels.get(channel);
    if (c) c.autoPlayerData.on = on;
    //    this.channels[channel].autoPlayerData.on = on;
  }

  getAuto(channel: number): boolean {
    const c = this.channels.get(channel);
    return c ? c.autoPlayerData.on : false;
    //    return this.channels[channel].autoPlayerData.on;
  }

  loopOn(loop: KLoop, on: boolean) {
    if (on) { this.player.on(loop) } else { this.player.off(loop) }

    this.channels.forEach((info, channelNum) => {
      const hasLoop = info.loopStates.has(loop);
      if (hasLoop) info.loopStates.set(loop, on);
    });
  }


  addLoop(loop: KLoop, channel: number) {

    let loopsThisChannel = this.channels.get(channel);
    // add the channel if needed
    if (!loopsThisChannel) {
      loopsThisChannel = new KChannelInfo();
      this.channels.set(channel, loopsThisChannel);
    }
    // add the loop
    loopsThisChannel.loopStates.set(loop, false);

    this.player.addLoop(loop);
  }

}
