import { get } from '@easy-webpack/core';
import { autoinject } from 'aurelia-dependency-injection';
import { KLoop } from './../models/kloop';
import { KLoopPlayer } from "./kLoopPlayer";
import { TransportEvents } from "./transportEvents";
import { AutoPlayerModel, AutoPlayerService } from "./autoPlayer";

class KChannelInfo {
  name: string;
  autoPlayerData = new AutoPlayerModel();
  loopStates = new Map<KLoop, boolean>();
}

@autoinject()
export class Komposer {

private  channels: KChannelInfo[] = [];

  constructor(
    private transportEvents: TransportEvents,
    private player: KLoopPlayer,
    private auto: AutoPlayerService,

  ) {

    // add one channel to start
    this.addChannel("Channel 1");

    // start a background clock
    transportEvents.listen((measure) => {

      this.playAuto(measure);

    })

  }

  private addChannel(name: string): KChannelInfo {
    let c = new KChannelInfo();
    c.name = name;
    this.channels.push(c);
    return c;
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

  get channelNames(): string[] {
    return this.channels.map(c => c.name);
  }

  setAuto(channel: number, on: boolean) {
    if (channel >= this.channels.length) return;
    const c = this.channels[channel];
    if (c) c.autoPlayerData.on = on;
    if (!on) this.mute(channel);
  }

  getAuto(channel: number): boolean {
    if (channel >= this.channels.length) false;
    const c = this.channels[channel];
    return c ? c.autoPlayerData.on : false;
  }

  loopOn(loop: KLoop, on: boolean) {
    if (on) { this.player.on(loop) } else { this.player.off(loop) }

    this.channels.forEach(c => {
      const hasLoop = c.loopStates.has(loop);
      if (hasLoop) c.loopStates.set(loop, on);
    });
  }

  mute(channel: number) {
    if (channel >= this.channels.length) false;
    const c = this.channels[channel];
    c.loopStates.forEach((on, loop) => {
      this.loopOn(loop, false);
    });
  }


  addLoop(loop: KLoop, channel: number) {
    if (channel >= this.channels.length) false;

    const c = this.channels[channel];

    // add the loop
    c.loopStates.set(loop, false);

    this.player.addLoop(loop);
  }

}
