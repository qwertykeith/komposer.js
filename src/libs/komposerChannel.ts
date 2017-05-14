import { get } from '@easy-webpack/core';
import { KLoopPlayer, KLoop } from "./kLoopPlayer";
import { TransportEvents } from "./transportEvents";
import { AutoPlayerModel, AutoPlayer } from "./autoPlayer";

export class KomposerChannel {

  name: string = "Channel";
  autoPlayerData = new AutoPlayerModel();

  players: KLoopPlayer[] = [];
  private auto: AutoPlayer = new AutoPlayer();

  constructor() {

    this.startClock();
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

  addLoop(loop: KLoop): KLoopPlayer {
    const player = new KLoopPlayer(loop);
    this.players.push(player);
    return player;
  }

}
