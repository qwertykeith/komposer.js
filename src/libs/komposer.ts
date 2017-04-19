import { autoinject } from 'aurelia-dependency-injection';
import { KLoop } from './../models/kloop';
import { KLoopPlayer } from "./kLoopPlayer";

@autoinject()
export class Komposer {

  constructor(
    private player: KLoopPlayer


  ) {

  }

  on(loop: KLoop) {
    this.player.on(loop);

  }

  off(loop: KLoop) {
    this.player.off(loop);
  }

  addLoop(loop: KLoop) {
    this.player.addLoop(loop);

  }

}
