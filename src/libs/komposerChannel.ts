import { get } from '@easy-webpack/core';
import { KLoopPlayer, KLoop } from "./kLoopPlayer";
import { TransportEvents } from "./transportEvents";
import { AutoPlayerModel, AutoPlayer } from "./autoPlayer";

export class KomposerChannel {

  name: string = "Channel";
  autoPlayerData = new AutoPlayerModel();

  // loopStates = new Map<KLoop, boolean>();

  private players: KLoopPlayer[] = [];
  private auto: AutoPlayer = new AutoPlayer();

  constructor() {

    this.startClock();
  }

  private startClock() {
    // start a background clock
    const transportEvents = new TransportEvents();
    transportEvents.listen((measure) => {
      this.playAuto(measure);
    })
  }

  // private addChannel(name: string): KChannelInfo {
  //   let c = new KChannelInfo();
  //   c.name = name;
  //   this.channels.push(c);
  //   return c;
  // }

  private playAuto(measure: number) {
    this.auto.setState(this.autoPlayerData, this.players, measure);

    // if (this.autoPlayerData.on) {

    //   // newState.forEach((value, loop) => {
    //   //   this.loopOn(loop, value);
    //   // });
    // }

  }

  // // get channelNames(): string[] {
  // //   return this.channels.map(c => c.name);
  // // }

  // setAuto(channel: number, on: boolean) {
  //   if (channel >= this.channels.length) return;
  //   const c = this.channels[channel];
  //   if (c) c.autoPlayerData.on = on;
  //   if (!on) this.mute(channel);
  // }

  // getAuto(channel: number): boolean {
  //   if (channel >= this.channels.length) false;
  //   const c = this.channels[channel];
  //   return c ? c.autoPlayerData.on : false;
  // }

  // loopOn(loop: KLoop, on: boolean) {
  //   if (on) { this.player.on(loop) } else { this.player.off(loop) }

  //   this.channels.forEach(c => {
  //     const hasLoop = c.loopStates.has(loop);
  //     if (hasLoop) c.loopStates.set(loop, on);
  //   });
  // }

  // mute(channel: number) {
  //   if (channel >= this.channels.length) false;
  //   const c = this.channels[channel];
  //   c.loopStates.forEach((on, loop) => {
  //     this.loopOn(loop, false);
  //   });
  // }


  addLoop(loop: KLoop): KLoopPlayer {
    const player = new KLoopPlayer(loop);
    this.players.push(player);
    return player;
  }

}
