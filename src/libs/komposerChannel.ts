import { get } from '@easy-webpack/core';
import { KLoopPlayer, KLoop } from "./kLoopPlayer";
import { TransportEvents } from "./transportEvents";
import { AutoPlayerModel, AutoPlayer } from "./autoPlayer";
import { XYLocation } from "../viewModels/location";
import { ChannelTriggerEvents } from "./channelTriggerEvents";

export class KomposerChannel {

  name: string = "Channel";
  autoPlayerData = new AutoPlayerModel();
  pos = <XYLocation>{ x: 0, y: 0 };

  //  showTick: boolean;

  players: KLoopPlayer[] = [];
  private auto: AutoPlayer = new AutoPlayer();

  private triggerEvents: ChannelTriggerEvents = new ChannelTriggerEvents();

  constructor() {
    this.startClock();
  }

  delete(player: KLoopPlayer) {
    //    const player = this.players.filter(p => p.getLoop() == loop);
    player.on = false;
    const playerIndex = this.players.indexOf(player);
    if (playerIndex >= 0) this.players.splice(playerIndex, 1);
    console.log("deleted");
    console.log(playerIndex);
  }

  allOff() {
    this.players.forEach(p => p.on = false);
  }

  private startClock() {
    // start a background clock
    const transportEvents = new TransportEvents();
    transportEvents.listen((measure) => {
      this.playAuto(measure);
    })
  }

  private playAuto(measure: number) {
    this.auto.setState(this.autoPlayerData, this.players, measure);

  }

  listen(callback: () => void) {
    this.triggerEvents.listen(() => {
      callback();
    })
  }

  addLoop(loop: KLoop): KLoopPlayer {
    const player = new KLoopPlayer(loop);
    this.players.push(player);

    let lastTimeout: any = null;

    player.listen(() => {
      this.triggerEvents.dispatch();
    });

    return player;
  }




}
