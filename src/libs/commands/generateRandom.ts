import { autoinject } from 'aurelia-dependency-injection';

import { KomposerChannel } from "../komposerChannel";
import { LoopLibrary } from "../sounds/loopLibrary";
import { AddLoopsCommand } from "./addLoops";

@autoinject()
export class GenerateRandomCommand {

  constructor(private addLoopsCommand: AddLoopsCommand) {

  }

  execute(channel: KomposerChannel) {
    channel.allOff();
    var loops = LoopLibrary.getRandomSounds();
    channel.players = [];
    this.addLoopsCommand.execute(channel, loops)
  }


}
